import mongoose from 'mongoose';
import crypto from 'crypto';

// Use a global cache for the mongoose connection to avoid opening new connections on every lambda call
const cached = globalThis._mongo || (globalThis._mongo = {});

const connect = async () => {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 7 has good defaults; keep options minimal
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

function genRegistrationNumber() {
  const id = crypto.randomBytes(4).toString('hex').toUpperCase();
  const ts = Date.now().toString(36).toUpperCase().slice(-4);
  return `CSI-${ts}-${id}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    await connect();

    const registrationSchema = new mongoose.Schema({
      registrationNumber: { type: String, unique: true },
      createdAt: { type: Date, default: Date.now },
      data: { type: mongoose.Schema.Types.Mixed },
    });

    const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

    const payload = req.body;
    let regNum = genRegistrationNumber();

    // Ensure uniqueness with a few retries
    let exists = await Registration.findOne({ registrationNumber: regNum }).exec();
    let attempts = 0;
    while (exists && attempts < 5) {
      regNum = genRegistrationNumber();
      exists = await Registration.findOne({ registrationNumber: regNum }).exec();
      attempts++;
    }

    const doc = new Registration({ registrationNumber: regNum, data: payload });
    await doc.save();

    return res.json({ success: true, registrationNumber: regNum, saved: doc });
  } catch (err) {
    console.error('API/register error:', err);
    return res.status(500).json({ success: false, error: (err && err.message) || 'Server error' });
  }
}
