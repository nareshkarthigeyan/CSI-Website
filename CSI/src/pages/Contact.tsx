import "./Contact.css";

const Contact = () => {
  const coordinators = [
    {
      activity: "Tech Symposium (Pick & Speak)",
      name: "Dr. Priya Sharma",
      position: "Professor, CSE Department",
      phone: "+91-98765-43210",
      email: "priya.sharma@cambridge.edu.in",
    },
    {
      activity: "Ideathon",
      name: "Prof. Rajesh Kumar",
      position: "Associate Professor, ISE Department",
      phone: "+91-98765-43211",
      email: "rajesh.kumar@cambridge.edu.in",
    },
    {
      activity: "TechQuizz",
      name: "Dr. Anita Desai",
      position: "Professor, IoT Department",
      phone: "+91-98765-43212",
      email: "anita.desai@cambridge.edu.in",
    },
    {
      activity: "Poster Presentation",
      name: "Prof. Suresh Patel",
      position: "Associate Professor, AIML Department",
      phone: "+91-98765-43213",
      email: "suresh.patel@cambridge.edu.in",
    },
    {
      activity: "Program Repair (Code Debugging)",
      name: "Prof. Kavya Reddy",
      position: "Assistant Professor, CSE Department",
      phone: "+91-98765-43214",
      email: "kavya.reddy@cambridge.edu.in",
    },
  ];

  const generalContacts = [
    {
      title: "Event Coordinator",
      name: "Dr. Priya Sharma",
      position: "Professor & Head, CSE Department",
      phone: "+91-98765-43210",
      email: "csi.coordinator@cambridge.edu.in",
    },
    {
      title: "Registration Support",
      name: "Ms. Sneha Agarwal",
      position: "Administrative Officer",
      phone: "+91-98765-43215",
      email: "registration@cambridge.edu.in",
    },
    {
      title: "Technical Support",
      name: "Mr. Arjun Mehta",
      position: "IT Administrator",
      phone: "+91-98765-43216",
      email: "tech.support@cambridge.edu.in",
    },
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our event coordinators and support team</p>
        </div>
      </section>

      {/* Activity Coordinators */}
      <section className="activity-coordinators">
        <div className="container">
          <h2>Activity Coordinators</h2>
          <p className="section-description">
            Connect with the coordinators for specific event activities
          </p>
          <div className="coordinators-grid">
            {coordinators.map((coordinator, index) => (
              <div key={index} className="coordinator-card">
                <div className="card-header">
                  <h3>{coordinator.activity}</h3>
                </div>
                <div className="card-content">
                  <div className="coordinator-info">
                    <h4>{coordinator.name}</h4>
                    <p className="position">{coordinator.position}</p>
                  </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <span className="contact-icon">Phone</span>
                      <a href={`tel:${coordinator.phone}`}>
                        {coordinator.phone}
                      </a>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">Email</span>
                      <a href={`mailto:${coordinator.email}`}>
                        {coordinator.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Contacts */}
      <section className="general-contacts">
        <div className="container">
          <h2>General Support</h2>
          <p className="section-description">
            For general inquiries and support
          </p>
          <div className="general-contacts-grid">
            {generalContacts.map((contact, index) => (
              <div key={index} className="general-contact-card">
                <div className="contact-header">
                  <h3>{contact.title}</h3>
                </div>
                <div className="contact-body">
                  <h4>{contact.name}</h4>
                  <p className="position">{contact.position}</p>
                  <div className="contact-links">
                    <a href={`tel:${contact.phone}`} className="contact-link">
                      <span className="contact-icon">Phone</span>
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="contact-link"
                    >
                      <span className="contact-icon">Email</span>
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Information */}
      <section className="college-info">
        <div className="container">
          <div className="college-details">
            <div className="college-address">
              <h2>Cambridge Institute of Technology</h2>
              <div className="address-details">
                <p>
                  <span className="address-icon">Location</span>
                  Cambridge Layout, Bangalore - 560036
                  <br />
                  Karnataka, India
                </p>
                <p>
                  <span className="address-icon">Phone</span>
                  <a href="tel:+918012345678">+91-80-12345678</a>
                </p>
                <p>
                  <span className="address-icon">Email</span>
                  <a href="mailto:info@cambridge.edu.in">
                    info@cambridge.edu.in
                  </a>
                </p>
                <p>
                  <span className="address-icon">Website</span>
                  <a
                    href="https://www.cambridge.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.cambridge.edu.in
                  </a>
                </p>
              </div>
            </div>
            <div className="college-map">
              <div className="map-placeholder">
                <h3>Campus Location</h3>
                <p>Cambridge Institute of Technology</p>
                <p>Bangalore, Karnataka</p>
                <button className="map-button">Get Directions</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-contact">
        <div className="container">
          <div className="emergency-card">
            <h2>Event Day Emergency Contact</h2>
            <div className="emergency-details">
              <div className="emergency-item">
                <h3>Event Helpdesk</h3>
                <p>
                  <span className="contact-icon">Phone</span>
                  <strong>+91-98765-55555</strong>
                </p>
                <p className="availability">
                  Available: Feb 15-16, 2025 (7 AM - 8 PM)
                </p>
              </div>
              <div className="emergency-item">
                <h3>WhatsApp Support</h3>
                <p>
                  <span className="contact-icon">WhatsApp</span>
                  <strong>+91-98765-66666</strong>
                </p>
                <p className="availability">For quick queries and updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
