import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Events.css";
import useInView from "../hooks/useInView";
import AnimatedNumber from "../components/AnimatedNumber";

const Events = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          const elementPosition = element.offsetTop - 100;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.12 });

  const eventDetails = [
    {
      id: "tech-symposium",
      name: "Tech Symposium (Pick & Speak)",
      icon: "",
      duration: "2 hours",
      teamSize: "Individual/Team (2-3)",
      description:
        "A prestigious platform for students to present their innovative ideas, research findings, and technical projects. Participants will showcase their work through presentations and interactive sessions.",
      rules: [
        "Presentation time: 10 minutes + 5 minutes Q&A",
        "Topics can include research projects, innovative solutions, or emerging technologies",
        "Visual aids (PowerPoint/Prezi) are mandatory",
        "Original work only - plagiarism will result in disqualification",
        "Judging based on innovation, technical depth, and presentation skills",
      ],
      prizes: ["Winner: ₹4000", "1st Runner-up: ₹2500", "2nd Runner-up: ₹1500"],
      coordinator: "Prof. Raghu P",
    },

    {
      id: "ideathon",
      name: "Ideathon",
      icon: "",
      duration: "6 hours",
      teamSize: "Team (3-4)",
      description:
        "A high-energy innovation challenge where teams brainstorm, design, and prototype solutions to real-world problems within the event timeframe. Teams should prepare a short demo and pitch.",
      rules: [
        "Problem statements will be revealed at the start of the event",
        "Teams can use any technology stack or framework",
        "Prototypes must be functional (not just mockups)",
        "Final presentation: 15 minutes pitch + demo",
        "Internet access and external libraries are allowed",
      ],
      prizes: ["Winner: ₹6000", "1st Runner-up: ₹3500", "2nd Runner-up: ₹2000"],
      coordinator: "Prof. Varalkshmi K V",
    },

    {
      id: "techquizz",
      name: "TechQuizz",
      icon: "",
      duration: "1.5 hours",
      teamSize: "Individual/Team (2)",
      description:
        "A rapid-fire quiz testing knowledge across algorithms, systems, AI/ML, web technologies, and current trends in computing. Multiple rounds will determine finalists.",
      rules: [
        "Multiple rounds: Prelims (online) + Finals (offline)",
        "Topics include DSA, OS, Networks, AI/ML, Web Technologies, and Current Tech",
        "No electronic devices allowed during the quiz",
        "Negative marking for wrong answers in final rounds",
        "Top teams from prelims qualify for finals",
      ],
      prizes: ["Winner: ₹3000", "1st Runner-up: ₹1500", "2nd Runner-up: ₹800"],
      coordinator: "Prof. Varalkshmi K V",
    },

    {
      id: "poster",
      name: "Poster Presentation",
      icon: "",
      duration: "3 hours",
      teamSize: "Individual/Team (2-3)",
      description:
        "Present research findings, project outcomes, or case studies through well-designed posters focusing on clarity, visual communication, and impact.",
      rules: [
        "Poster size: A1 (594 x 841 mm)",
        "Content should be original research or project work",
        "Include methodology, results, and conclusions",
        "5 minutes presentation + 3 minutes Q&A per poster",
        "Judging based on content quality, design, and presentation",
      ],
      prizes: ["Winner: ₹2500", "1st Runner-up: ₹1200", "2nd Runner-up: ₹700"],
      coordinator: "Prof. Anusha",
    },

    {
      id: "program-repair",
      name: "Program Repair",
      icon: "",
      duration: "2 hours",
      teamSize: "Individual",
      description:
        "A focused coding challenge to debug, optimize, and fix logical/programmatic issues in provided code snippets. Tests are automated through an online judge.",
      rules: [
        "Multiple programming languages supported (C++, Java, Python)",
        "Problems include syntax errors, logical bugs, and optimization challenges",
        "Online judge system for automatic evaluation",
        "Partial marking for partially correct solutions",
        "No internet access except for language documentation",
      ],
      prizes: ["Winner: ₹3000", "1st Runner-up: ₹1500"],
      coordinator: "Prof. Laxmi",
    },
  ];

  return (
    <div className="events">
      {/* Hero Section */}
      {(() => {
        const setHeroRef: React.RefCallback<HTMLElement> = (el) => {
          (heroRef as React.MutableRefObject<HTMLElement | null>).current = el;
        };
        return (
          <section
            ref={setHeroRef}
            className={`events-hero ${heroInView ? "reveal" : "hidden"}`}
          >
            <div className="container">
              <h1>Event Details</h1>
              <p className="events-subtitle">
                Here's everything you need to know about the exciting activities
                at CSI Event 2025
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
                    <AnimatedNumber value={250} />
                  </strong>
                  + Registrations
                </span>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Events List */}
      <section className="events-list">
        <div className="container">
          {eventDetails.map((event) => (
            <div key={event.id} id={event.id} className="event-card">
              <div className="event-header">
                <div className="event-icon">{event.icon}</div>
                <div className="event-basic-info">
                  <h2>{event.name}</h2>
                  <div className="event-meta">
                    <span className="duration">{event.duration}</span>
                    <span className="team-size">{event.teamSize}</span>
                  </div>
                </div>
              </div>

              <div className="event-content">
                <div className="event-description">
                  <h3>About</h3>
                  <div className="about-content">
                    <p>{event.description}</p>
                  </div>
                </div>

                <div className="event-rules">
                  <h3>Rules & Guidelines</h3>
                  <ul>
                    {event.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="event-footer">
                  <div className="event-prizes">
                    <h4>Prizes</h4>
                    <div className="prizes-list">
                      {event.prizes.map((prize, prizeIndex) => (
                        <span key={prizeIndex} className="prize">
                          {prize}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="event-coordinator">
                    <h4>Event Coordinator</h4>
                    <p>{event.coordinator}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="events-cta">
        <div className="container">
          <h2>Ready to Participate?</h2>
          <p>
            Choose your favorite events and register now to secure your spot!
          </p>
          <Link to="/registration" className="cta-button">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Events;
