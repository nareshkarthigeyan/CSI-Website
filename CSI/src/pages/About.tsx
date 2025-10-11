import "./About.css";
import useInView from "../hooks/useInView";
import useParallax from "../hooks/useParallax";
import AnimatedNumber from "../components/AnimatedNumber";

const About = () => {
  // hero parallax + reveal
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.12 });
  const parallaxRef = useParallax(0.04) as React.RefObject<HTMLElement>;
  const attachHeroRefs: React.RefCallback<HTMLElement> = (el) => {
    // assign element to both refs when available
    (heroRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <div className="about">
      {/* Hero Section */}
      <section
        ref={attachHeroRefs as any}
        className={`about-hero ${heroInView ? "reveal" : "hidden"}`}
      >
        <div className="container">
          <h1>About CSI Event 2025</h1>
          <p className="hero-subtitle">
            Discover Innovation, Technology, and Excellence
          </p>
          <div className="hero-mini-stats">
            <span className="stat">
              <strong>
                <AnimatedNumber value={5} />
              </strong>{" "}
              Events
            </span>
            <span className="stat">
              <strong>
                <AnimatedNumber value={100} />
              </strong>
              + Participants
            </span>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <EventSection />

      <PurposeSection />

      <KeyActivities />

      {/* Participation */}
      <section className="participation">
        <div className="container">
          <h2>Who Can Participate?</h2>
          <div className="participation-content">
            <div className="participation-info">
              <h3>Eligibility Criteria</h3>
              <ul>
                <li>Open to all undergraduate engineering students</li>
                <li>
                  Students interested in technology, engineering, and computer
                  science
                </li>
                <li>Individual and team registrations are welcome</li>
                <li>
                  No prerequisites required - beginners are encouraged to
                  participate
                </li>
                <li>
                  Students from all departments (CSE, ISE, IoT, AIML) can
                  register
                </li>
              </ul>
            </div>
            <div className="participation-benefits">
              <h3>What You'll Gain</h3>
              <ul>
                <li>Hands-on experience with cutting-edge technologies</li>
                <li>
                  Networking opportunities with peers and industry professionals
                </li>
                <li>Certificates and prizes for outstanding performances</li>
                <li>Enhanced problem-solving and presentation skills</li>
                <li>Exposure to real-world technical challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EventReminder />
    </div>
  );
};

export default About;

// Small subcomponents to keep hooks valid and scoped
function EventSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const setRef: React.RefCallback<HTMLElement> = (el) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef}
      className={`event-overview ${inView ? "reveal" : "hidden"}`}
    >
      <div className="container">
        <h2>Event Overview</h2>
        <div className="overview-content">
          <p>
            CSI Event 2025 is a prestigious technology fest organized by
            Cambridge Institute of Technology to bring together students
            passionate about technology, innovation, and collaboration. This
            event serves as a dynamic platform where aspiring technologists can
            showcase their skills, solve real-world problems, and network with
            like-minded individuals from across the region.
          </p>
          <p>
            Our fest celebrates the spirit of innovation and provides
            participants with opportunities to learn from industry experts,
            compete in challenging technical events, and gain exposure to
            cutting-edge technologies. Whether you're a coding enthusiast, a
            research scholar, or someone passionate about technology, CSI Event
            2025 has something exciting for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}

function PurposeSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const setRef2: React.RefCallback<HTMLElement> = (el) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef2}
      className={`purpose-section ${inView ? "reveal" : "hidden"}`}
    >
      <div className="container">
        <h2>Purpose of the Event</h2>
        <div className="purpose-grid">
          <div className="purpose-card bento">
            <div className="purpose-icon">Innovation</div>
            <h3>Encourage Innovation</h3>
            <p>
              Foster creative thinking and innovative solutions to contemporary
              technological challenges
            </p>
          </div>
          <div className="purpose-card bento">
            <div className="purpose-icon">Thinking</div>
            <h3>Promote Critical Thinking</h3>
            <p>
              Develop analytical and problem-solving skills essential for future
              technologists
            </p>
          </div>
          <div className="purpose-card">
            <div className="purpose-icon">Excellence</div>
            <h3>Technical Excellence</h3>
            <p>
              Recognize and reward outstanding technical achievements and
              project implementations
            </p>
          </div>
          <div className="purpose-card">
            <div className="purpose-icon">Collaboration</div>
            <h3>Healthy Competition</h3>
            <p>
              Provide a platform for friendly competition while promoting
              teamwork and collaboration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyActivities() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const setRef3: React.RefCallback<HTMLElement> = (el) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef3}
      className={`key-activities ${inView ? "reveal" : "hidden"}`}
    >
      <div className="container">
        <h2>Key Activities Overview</h2>
        <div className="activities-list">
          {[
            {
              id: "tech-symposium",
              name: "Tech Symposium (Pick & Speak)",
              description:
                "Short 5–7 minute presentations where participants present ideas on emerging technologies. Judged on clarity, originality and delivery.",
            },
            {
              id: "ideathon",
              name: "Ideathon",
              description:
                "Team-based ideation challenge to propose a feasible product or solution to real-world problems. Teams pitch to judges with a brief mockup or roadmap.",
            },
            {
              id: "tech-quiz",
              name: "TechQuizz",
              description:
                "A fast-paced technical quiz with multiple rounds (prelims, buzzer rounds, and finals) covering programming, algorithms, networks and general CS knowledge.",
            },
            {
              id: "poster-presentation",
              name: "Poster Presentation",
              description:
                "Research and project posters judged on clarity of thought, methodology, results and potential impact. Ideal for students with academic or prototype work.",
            },
            {
              id: "programming-contest",
              name: "Programming Contest (Multi-round)",
              description:
                "A multi-stage contest covering algorithmic problem solving, debugging and team-based coding sprints. Rounds include online qualifier, onsite individual rounds and a final team challenge.",
            },
          ].map((act) => (
            <div key={act.id} className="activity-item">
              <h3>{act.name}</h3>
              <p>{act.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventReminder() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const setRef4: React.RefCallback<HTMLElement> = (el) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef4}
      className={`event-reminder ${inView ? "reveal" : "hidden"}`}
    >
      <div className="container">
        <h2>Event Details</h2>
        <div className="reminder-info">
          <div className="reminder-item">
            <strong>Date:</strong> October 18, 2025
          </div>
          <div className="reminder-item">
            <strong>Venue:</strong> Cambridge Institute of Technology, Bangalore
          </div>
          <div className="reminder-item">
            <strong>Time:</strong> 9:00 AM onwards
          </div>
          <div className="reminder-item">
            <strong>Registration:</strong> Open until October 16, 2025
          </div>
        </div>
      </div>
    </section>
  );
}
