import "./Contact.css";
import useInView from "../hooks/useInView";

type Student = {
  name: string;
  usn?: string;
  branch?: string;
  semester?: string | number;
  email?: string;
  phone?: string;
};

type Coordinator = {
  activity: string;
  name: string;
  position: string;
  department?: string;
  phone?: string;
  email?: string;
  studentCoordinators?: Student[];
};

type GeneralContact = {
  title: string;
  name: string;
  position: string;
  phone?: string;
  email?: string;
};

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.09 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12.91.38 1.8.76 2.63a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.35-1.35a2 2 0 0 1 2.11-.45c.83.38 1.72.64 2.63.76A2 2 0 0 1 22 16.92z" fill="currentColor" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor" />
  </svg>
);

const WebsiteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 11H18a13 13 0 0 1 0-2h.9A8.96 8.96 0 0 1 18.9 13zM12 4c1.48 1.75 2.5 4.1 2.83 7H9.17C9.5 8.1 10.52 5.75 12 4zM6.1 13H8a13 13 0 0 1 0-2H6.1a8.96 8.96 0 0 1 0 2zM12 20c-1.48-1.75-2.5-4.1-2.83-7h5.66C14.5 15.9 13.48 18.25 12 20z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20.52 3.48A11.88 11.88 0 0 0 12 0C5.37 0 .02 5.35.02 12.01c0 2.12.55 4.17 1.6 5.97L0 24l6.24-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.35 12-11.99 0-3.2-1.25-6.2-3.48-8.53zM12 21.5c-1.16 0-2.3-.3-3.3-.86l-.24-.14-3.71.97.99-3.62-.15-.25A8.5 8.5 0 1 1 20.5 12 8.45 8.45 0 0 1 12 21.5zM17.05 14.17c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14s-.7.88-.86 1.06c-.16.18-.32.2-.6.07-.27-.13-1.13-.42-2.15-1.33-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.19-.27.28-.45.09-.18.04-.34-.02-.48-.06-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-1 1-1 2.5s1.03 2.9 1.17 3.1c.14.18 2.02 3.08 4.9 4.32 2.72 1.18 2.72.79 3.21.74.5-.06 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.17-.52-.31z" fill="currentColor" />
  </svg>
);

const CoordinatorCard: React.FC<{ coordinator: Coordinator }> = ({ coordinator }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`coordinator-card ${inView ? "reveal" : "hidden"}`}
    >
      <div className="card-header">
        <h3>{coordinator.activity}</h3>
      </div>
      <div className="card-content">
        <div className="coordinator-info">
          <h4>{coordinator.name}</h4>
          <p className="position">{coordinator.position}</p>
          {coordinator.department && <p className="department">{coordinator.department}</p>}
        </div>
        {((coordinator.phone && coordinator.phone.length) || (coordinator.email && coordinator.email.length) || (coordinator.studentCoordinators && coordinator.studentCoordinators.length)) && (
          <div className="contact-details">
            {coordinator.phone && (
              <div className="contact-item">
                <span className="contact-icon"><PhoneIcon /></span>
                <a href={`tel:${coordinator.phone}`}>{coordinator.phone}</a>
              </div>
            )}
            {coordinator.email && (
              <div className="contact-item">
                <span className="contact-icon"><EmailIcon /></span>
                <a href={`mailto:${coordinator.email}`}>{coordinator.email}</a>
              </div>
            )}
            {coordinator.studentCoordinators && (
              <div className="student-coordinators">
                <ul>
                  {coordinator.studentCoordinators?.map((sc: Student, i: number) => (
                    <li key={i}>
                      {sc.name} {sc.phone && <>— <a href={`tel:${sc.phone}`}>{sc.phone}</a></>}
                      {sc.email && (
                        <>
                          <br />
                          <a href={`mailto:${sc.email}`}>{sc.email}</a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GeneralContactCard: React.FC<{ contact: GeneralContact }> = ({ contact }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`general-contact-card ${inView ? "reveal" : "hidden"}`}>
      <div className="contact-header">
        <h3>{contact.title}</h3>
      </div>
      <div className="contact-body">
        <h4>{contact.name}</h4>
        <p className="position">{contact.position}</p>
        <div className="contact-links">
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="contact-link">
              <span className="contact-icon"><PhoneIcon /></span>
              {contact.phone}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="contact-link">
              <span className="contact-icon"><EmailIcon /></span>
              {contact.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const StudentCard: React.FC<{ s: Student }> = ({ s }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });
  const initials = (s.name || "").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`student-card ${inView ? "reveal" : "hidden"}`}>
      <div className="student-top">
        <div className="student-avatar" aria-hidden>
          {initials}
        </div>
        <div className="student-meta">
          <h4>{s.name}</h4>
          <div className="badges">
            {s.branch && <span className="badge">{s.branch}</span>}
            {s.semester && <span className="badge">Sem {s.semester}</span>}
          </div>
        </div>
      </div>

      <p className="usn"><strong>USN:</strong> {s.usn}</p>

      <div className="student-actions">
        {s.email && (
          <a className="action" href={`mailto:${s.email}`} title={`Email ${s.name}`}>
            <span className="contact-icon"><EmailIcon /></span>
            <span className="action-text">Email</span>
          </a>
        )}
        {s.phone && (
          <a className="action" href={`tel:${s.phone}`} title={`Call ${s.name}`}>
            <span className="contact-icon"><PhoneIcon /></span>
            <span className="action-text">Call</span>
          </a>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const coordinators = [
    {
      activity: "CSI",
      name: "Prof. Lakshmishree M S",
      position: "CSI Coordinator",
      department: "CIT",
      email: "lakshmi.cse@cambridge.edu.in",
      phone: "+91 86182 09919",
      studentCoordinators: [],
    },
    {
      activity: "Ideathon",
      name: "Prof. Varalkshmi K V",
      position: "Ideathon Coordinator",
      department: "Department of CSE",
      email: "varalakshmi.cse@cambridge.edu.in",
      phone: "+91 97316 96444",
      studentCoordinators: [],
    },
    {
      activity: "Tech Symposium & TechQuizz",
      name: "Prof. Raghu P",
      position: "Tech Symposium & TechQuizz Coordinator",
      department: "Department of ISE",
      studentCoordinators: [],
    },
    {
      activity: "Poster Presentation",
      name: "Prof. Anusha",
      position: "Poster Presentation Coordinator",
      department: "Department of AIML",
      email: "anusha.aiml@cambridge.edu.in",
      phone: "+91 97426 10808",
      studentCoordinators: [],
    },
    {
      activity: "Programming Contest",
      name: "Prof. Laxmi",
      position: "Programming Contest Coordinator",
      department: "Department of IoT & Cyber Security",
      email: "laxmi.iotcs@cambridge.edu.in",
      studentCoordinators: [],
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
              <CoordinatorCard key={index} coordinator={coordinator} />
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
              <GeneralContactCard key={index} contact={contact} />
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
                  <span className="address-icon"><LocationIcon /></span>
                  Cambridge Layout, Bangalore - 560036
                  <br />
                  Karnataka, India
                </p>
                <p>
                  <span className="address-icon"><PhoneIcon /></span>
                  <a href="tel:+918012345678">+91-80-12345678</a>
                </p>
                <p>
                  <span className="address-icon"><EmailIcon /></span>
                  <a href="mailto:info@cambridge.edu.in">
                    info@cambridge.edu.in
                  </a>
                </p>
                <p>
                  <span className="address-icon"><WebsiteIcon /></span>
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
                  <span className="contact-icon"><PhoneIcon /></span>
                  <strong>+91-98765-55555</strong>
                </p>
                <p className="availability">
                  Available: Feb 15-16, 2025 (7 AM - 8 PM)
                </p>
              </div>
              <div className="emergency-item">
                <h3>WhatsApp Support</h3>
                <p>
                  <span className="contact-icon"><WhatsAppIcon /></span>
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
              <StudentCard key={idx} s={s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
