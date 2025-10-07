import "./Contact.css";

const Contact = () => {
  const coordinators = [
    {
      activity: "Tech Symposium (Pick & Speak)",
      name: "Dr. Priya Sharma",
      position: "Professor, CSE Department",
      phone: "+91-98765-43210",
      email: "priya.sharma@cambridge.edu.in",
      studentCoordinators: [
        { name: 'K. Lakshmi Navyatha', phone: '+91 9980609374', email: 'navyatha.ise23@cambridge.edu.in' },
        { name: 'Spandana S', phone: '+91 8073875184', email: 'spandana.23ise@cambridge.edu.in' }
      ]
    },
    {
      activity: "Ideathon",
      name: "Prof. Rajesh Kumar",
      position: "Associate Professor, ISE Department",
      phone: "+91-98765-43211",
      email: "rajesh.kumar@cambridge.edu.in",
      studentCoordinators: [
        { name: 'Abhishek Pattar', phone: '+91 9916265862', email: 'abhishek.24cse@cambridge.edu.in' },
        { name: 'Swati', phone: '+91 6361451537', email: 'swati.23cse@cambridge.edu.in' }
      ]
    },
    {
      activity: "TechQuizz",
      name: "Dr. Anita Desai",
      position: "Professor, IoT Department",
      phone: "+91-98765-43212",
      email: "anita.desai@cambridge.edu.in",
      studentCoordinators: [
        { name: 'Limnisha Sanjana T G', phone: '+91 9731166553', email: 'limnisha.23ise@cambridge.edu.in' },
        { name: 'Limnisha', phone: '+91 9606077664', email: 'limnisha.23ise@cambridge.edu.in' }
      ]
    },
    {
      activity: "Poster Presentation",
      name: "Prof. Suresh Patel",
      position: "Associate Professor, AIML Department",
      phone: "+91-98765-43213",
      email: "suresh.patel@cambridge.edu.in",
      studentCoordinators: [
        { name: 'Shreya V', phone: '+91 6360516101', email: 'shreya.23aiml@cambridge.edu.in' },
        { name: 'Jaijan S', phone: '+91 9538045415', email: 'jaijan.23aiml@cambridge.edu.in' }
      ]
    },
    {
      activity: "Program Repair (Code Debugging)",
      name: "Prof. Kavya Reddy",
      position: "Assistant Professor, CSE Department",
      phone: "+91-98765-43214",
      email: "kavya.reddy@cambridge.edu.in",
      studentCoordinators: [
        { name: 'Naga Tejaswini', phone: '+91 7204023676', email: 'tejaswini.23iot@cambridge.edu.in' },
        { name: 'Naresh Karthigeyan', phone: '+91 7676661396', email: 'naresh.23iot@cambridge.edu.in' }
      ]
    },
  ];

  const generalContacts = [
    {
      title: "Event Coordinator",
      name: "Himanshu Verma (Main coordinator)",
      position: "Student Coordinator",
      phone: "+91-XXXXXXXXXX",
      email: "himanshu.22cse@cambridge.edu.in",
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

  const studentList = [
    { name: 'Himanshu Verma', usn: '1CD22CS048', branch: 'CSE', semester: '7', email: 'himanshu.22cse@cambridge.edu.in' },
    { name: 'Naga Tejaswini', usn: '1CD23IC034', branch: 'IC', semester: '5', email: 'tejaswini.23iot@cambridge.edu.in' },
    { name: 'Naresh Karthigeyan', usn: '1CD23IC026', branch: 'IC', semester: '5', email: 'naresh.23iot@cambridge.edu.in' },
    { name: 'Limnisha', usn: '1CD23IS080', branch: 'ISE', semester: '5', email: 'limnisha.23ise@cambridge.edu.in' },
    { name: 'Sanjana T G', usn: '1CD23IS145', branch: 'ISE', semester: '5', email: 'sanjana.23ise@cambridge.edu.in' },
    { name: 'K.Lakshmi Navyatha', usn: '1CD23IS068', branch: 'ISE', semester: '5', email: 'navyatha.ise23@cambridge.edu.in' },
    { name: 'Spandana S', usn: '1CD23IS166', branch: 'ISE', semester: '5', email: 'spandana.23ise@cambridge.edu.in' },
    { name: 'Prema B Malipatil', usn: '1CD23IS114', branch: 'ISE', semester: '5', email: 'prema.23ise@cambridge.edu.in' },
    { name: 'Yukthi M', usn: '1CD23CS200', branch: 'CSE', semester: '5', email: 'yukthim.23cse@cambridge.edu.in' },
    { name: 'Abhishek Pattar', usn: '1CD24CS400', branch: 'CSE', semester: '5', email: 'abhishek.24cse@cambridge.edu.in' },
    { name: 'Gururaj B K', usn: '1CD23CS052', branch: 'CSE', semester: '5', email: 'gururaj.23cse@cambridge.edu.in' },
    { name: 'Swati', usn: '1CD23CS173', branch: 'CSE', semester: '5', email: 'swati.23cse@cambridge.edu.in' },
    { name: 'Jeevan L', usn: '1CD23CS065', branch: 'CSE', semester: '5', email: 'jeevanl.23cse@cambridge.edu.in' },
    { name: 'Vivek Upadhayay', usn: '1CD23CS195', branch: 'CSE', semester: '5', email: 'vivek.23cse@cambridge.edu.in' },
    { name: 'Jaijan S', usn: '1CD23AI045', branch: 'AIML', semester: '5', email: 'jaijan.23aiml@cambridge.edu.in' },
    { name: 'Shreya V', usn: '1CD23AI098', branch: 'AIML', semester: '5', email: 'shreya.23aiml@cambridge.edu.in' },
    { name: 'Shushmita', usn: '1CD23AI127', branch: 'AIML', semester: '5', email: 'sushmitha.23eee@cambridge.edu.in' },
    { name: 'Yamini', usn: '1CD23AI125', branch: 'AIML', semester: '5', email: 'yamini.23aiml@cambridge.edu.in' },
    { name: 'Mayyoga', usn: '1CD23IS091', branch: 'ISE', semester: '5', email: 'mayooga.23ise@cambridge.edu.in' },
    { name: 'M Tarani Lakshmi', usn: '1CD23IS082', branch: 'ISE', semester: '5', email: 'taranilakshmi.23ise@cambridge.edu.in' }
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

      {/* Student Coordinators Directory */}
      <section className="student-coordinators">
        <div className="container">
          <h2>Student Coordinators</h2>
          <p className="section-description">Contact details for student coordinators</p>
          <div className="students-grid">
            {studentList.map((s, idx) => (
              <div key={idx} className="student-card">
                <h4>{s.name}</h4>
                <p><strong>USN:</strong> {s.usn}</p>
                <p><strong>Branch:</strong> {s.branch}</p>
                <p><strong>Semester:</strong> {s.semester}</p>
                <p><a href={`mailto:${s.email}`}>{s.email}</a></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
