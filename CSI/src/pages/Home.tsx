import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import useInView from "../hooks/useInView";
// parallax removed for background treatment on mobile
import AnimatedNumber from "../components/AnimatedNumber";

const activities = [
  {
    id: "tech-symposium",
    name: "Pick & Speak",
    icon: "",
    description: "Tech Symposium - Present your ideas",
  },
  {
    id: "ideathon",
    name: "Ideathon",
    icon: "",
    description: "Innovation competition",
  },
  {
    id: "tech-quiz",
    name: "TechQuizz",
    icon: "",
    description: "Test your technical knowledge",
  },
  {
    id: "poster-presentation",
    name: "Poster Presentation",
    icon: "",
    description: "Showcase your research",
  },
  {
    id: "code-debugging",
    name: "Program Repair",
    icon: "",
    description: "Code debugging challenge",
  },
];

const ActivityCard: React.FC<{ activity: (typeof activities)[number] }> = ({
  activity,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`activity-card ${inView ? "reveal" : "hidden"}`}
    >
      <Link to={`/events#${activity.id}`} className="activity-card-link">
        <div className="activity-icon">{activity.icon}</div>
        <h4>{activity.name}</h4>
        <p>{activity.description}</p>
        <div className="card-cta" aria-hidden="true">Learn more →</div>
      </Link>
    </div>
  );
};

const Home: React.FC = () => {
  // parallax hook removed — background logo will be handled by CSS

  return (
    <div className="home">
      <section className="hero">
        <div className="container items-center">
          <div className="hero-center">
            <div className="kicker">
              <img
                src="/csi-official.png"
                alt="CSI logo"
                className="hero-kicker-logo"
              />
              CSI • Campus Tech Summit
            </div>

            <h1 className="hero-title">
              CSI Event 2025
              <span className="title-accent"> — Build. Compete. Connect.</span>
            </h1>

            <p className="hero-sub">
              October 11, 2025 • Cambridge Institute of Technology — a full day
              of ideation, competition and career connections.
            </p>

            <div className="center">
              <Link to="/registration" className="btn btn-hero">
                Register Now
              </Link>
              <Link to="/events" className="btn btn-ghost">
                See Events
              </Link>
            </div>

            <ul className="hero-stats center">
              <li>
                <strong>
                  <AnimatedNumber value={5} />
                </strong>
                <span>Tracks</span>
              </li>
              <li>
                <strong>
                  <AnimatedNumber value={20} />
                </strong>
                <span>Prizes</span>
              </li>
              <li>
                <strong>
                  <AnimatedNumber value={100} />
                </strong>
                <span>Participants</span>
              </li>
            </ul>
          </div>

          {/* right decorative logo removed from DOM — it's now a CSS background */}
        </div>
      </section>

      <section className="about-event">
        <div className="container">
          <h2>About the Event</h2>
          <p className="text-center">
            CSI Event 2025 is a premier technology fest organized by Cambridge
            Institute of Technology to bring together students passionate about
            technology, innovation, and collaboration. Join us for an exciting
            journey of learning, competition, and networking.
          </p>
          <p className="text-center">
            The event features multiple tracks including ideathons, technical
            quizzes, poster presentations, and hands-on coding challenges.
            Participants will have the opportunity to showcase their ideas,
            solve real-world problems, and win exciting prizes. Industry experts
            and faculty will guide you throughout the day, making it a valuable
            experience for both beginners and seasoned tech enthusiasts.
          </p>
          <p className="text-center">
            Whether you want to compete, learn, or simply connect with
            like-minded peers, CSI Event 2025 is the perfect platform to ignite
            your passion for technology. Register now and be a part of this
            vibrant community!
          </p>
          <br />

          <div className="event-highlights">
            <h3>Events Conducted</h3>
            <div className="activities-grid">
              {activities.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="organizers">
        <div className="container">
          <h2>Event Coordinators</h2>
          <div className="organizers-grid">
            <div className="organizer-card">
              <h4>Prof. Lakshmishree M S</h4>
              <p>CSI Coordinator</p>
              <p>CIT</p>
            </div>

            <div className="organizer-card">
              <h4>Prof. Varalkshmi K V</h4>
              <p>Ideathon Coordinator</p>
              <p>Department of CSE</p>
            </div>

            <div className="organizer-card">
              <h4>Prof. Raghu P</h4>
              <p>Tech Symposium &amp; TechQuizz Coordinator</p>
              <p>Department of ISE</p>
            </div>

            <div className="organizer-card">
              <h4>Prof. Anusha</h4>
              <p>Poster Presentation Coordinator</p>
              <p>Department of AIML</p>
            </div>

            <div className="organizer-card">
              <h4>Prof. Laxmi</h4>
              <p>Program Repair Coordinator</p>
              <p>Department of IoT &amp; Cyber Security</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Join Us?</h2>
          <p>
            Don't miss this opportunity to showcase your skills and learn from
            the best!
          </p>
          <Link to="/registration" className="cta-button secondary">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
