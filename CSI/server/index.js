import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";

// load environment variables from .env.local (preferred) or .env
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/csi_registrations";

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

// Simple registration schema
const registrationSchema = new mongoose.Schema({
  registrationNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed },
});

const Registration = mongoose.model("Registration", registrationSchema);

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB:", mongoUri);
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }

  // Generate a short unique registration number
  function genRegistrationNumber() {
    const id = crypto.randomBytes(4).toString("hex").toUpperCase();
    const ts = Date.now().toString(36).toUpperCase().slice(-4);
    return `CSI-${ts}-${id}`;
  }

  app.post("/api/register", async (req, res) => {
    try {
      const payload = req.body;
      let regNum = genRegistrationNumber();

      // ensure uniqueness (rare collision)
      let exists = await Registration.findOne({
        registrationNumber: regNum,
      }).exec();
      let attempts = 0;
      while (exists && attempts < 5) {
        regNum = genRegistrationNumber();
        exists = await Registration.findOne({
          registrationNumber: regNum,
        }).exec();
        attempts++;
      }

      const doc = new Registration({
        registrationNumber: regNum,
        data: payload,
      });
      await doc.save();

      res.json({ success: true, registrationNumber: regNum, saved: doc });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();
