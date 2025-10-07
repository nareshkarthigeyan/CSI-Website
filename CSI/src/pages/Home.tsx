import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const activities = [
    {
      id: 'tech-symposium',
      name: 'Pick & Speak',
      icon: '🎤',
      description: 'Tech Symposium - Present your ideas'
    },
    {
      id: 'ideathon',
      name: 'Ideathon',
      icon: '💡',
      description: 'Innovation competition'
    },
    {
      id: 'tech-quiz',
      name: 'TechQuizz',
      icon: '🧠',
      description: 'Test your technical knowledge'
    },
    {
      id: 'poster-presentation',
      name: 'Poster Presentation',
      icon: '📊',
      description: 'Showcase your research'
    },
    {
      id: 'code-debugging',
      name: 'Program Repair',
      icon: '🔧',
      description: 'Code debugging challenge'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="event-title">CSI Event 2025</h1>
            <div className="event-details">
              <div className="event-info">
                <span className="event-date">📅 October 11, 2025 | 9AM onwards</span>
                <span className="event-venue">📍 Cambridge Institute of Technology, Bangalore</span>
              </div>
            </div>
            <p className="tagline">Unleashing Innovation & Technology</p>
            <Link to="/registration" className="cta-button">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* About Event Section */}
      <section className="about-event">
        <div className="container">
          <h2>About the Event</h2>
          <p className="event-description">
            CSI Event 2025 is a premier technology fest organized by Cambridge Institute of Technology 
            to bring together students passionate about technology, innovation, and collaboration. 
            Join us for an exciting journey of learning, competition, and networking.
          </p>
          
          <div className="event-highlights">
            <h3>Event Highlights</h3>
            <div className="activities-grid">
              {activities.map((activity) => (
                <Link 
                  key={activity.id} 
                  to={`/events#${activity.id}`}
                  className="activity-card"
                  title={`Learn more about ${activity.name}`}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <h4>{activity.name}</h4>
                  <p>{activity.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizers / Coordinators Section */}
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Join Us?</h2>
          <p>Don't miss this opportunity to showcase your skills and learn from the best!</p>
          <Link to="/registration" className="cta-button secondary">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home