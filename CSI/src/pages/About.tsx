import './About.css'

const About = () => {
  const keyActivities = [
    {
      name: 'Tech Symposium (Pick & Speak)',
      description: 'A platform for students to present their innovative ideas and technical projects. Participants will have the opportunity to showcase their research work, startup ideas, or technical solutions to real-world problems.'
    },
    {
      name: 'Ideathon',
      description: 'A 24-hour innovation marathon where teams brainstorm, design, and prototype solutions to given problem statements. This event encourages creative thinking and rapid prototyping skills.'
    },
    {
      name: 'TechQuizz',
      description: 'A comprehensive technical quiz covering various domains of computer science, engineering, and emerging technologies. Test your knowledge across programming, algorithms, data structures, and current tech trends.'
    },
    {
      name: 'Poster Presentation',
      description: 'Present your research findings, project outcomes, or case studies through well-designed posters. This event focuses on effective visual communication and research presentation skills.'
    },
    {
      name: 'Program Repair (Code Debugging)',
      description: 'A challenging coding competition where participants debug faulty programs, optimize code performance, and fix logical errors. Perfect for testing your problem-solving and analytical skills.'
    }
  ]

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About CSI Event 2025</h1>
          <p className="hero-subtitle">Discover Innovation, Technology, and Excellence</p>
        </div>
      </section>

      {/* Event Overview */}
      <section className="event-overview">
        <div className="container">
          <h2>Event Overview</h2>
          <div className="overview-content">
            <p>
              CSI Event 2025 is a prestigious technology fest organized by Cambridge Institute of Technology 
              to bring together students passionate about technology, innovation, and collaboration. This event 
              serves as a dynamic platform where aspiring technologists can showcase their skills, solve 
              real-world problems, and network with like-minded individuals from across the region.
            </p>
            <p>
              Our fest celebrates the spirit of innovation and provides participants with opportunities to 
              learn from industry experts, compete in challenging technical events, and gain exposure to 
              cutting-edge technologies. Whether you're a coding enthusiast, a research scholar, or someone 
              passionate about technology, CSI Event 2025 has something exciting for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="purpose-section">
        <div className="container">
          <h2>Purpose of the Event</h2>
          <div className="purpose-grid">
            <div className="purpose-card">
              <div className="purpose-icon">🚀</div>
              <h3>Encourage Innovation</h3>
              <p>Foster creative thinking and innovative solutions to contemporary technological challenges</p>
            </div>
            <div className="purpose-card">
              <div className="purpose-icon">🧠</div>
              <h3>Promote Critical Thinking</h3>
              <p>Develop analytical and problem-solving skills essential for future technologists</p>
            </div>
            <div className="purpose-card">
              <div className="purpose-icon">⭐</div>
              <h3>Technical Excellence</h3>
              <p>Recognize and reward outstanding technical achievements and project implementations</p>
            </div>
            <div className="purpose-card">
              <div className="purpose-icon">🤝</div>
              <h3>Healthy Competition</h3>
              <p>Provide a platform for friendly competition while promoting teamwork and collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Activities */}
      <section className="key-activities">
        <div className="container">
          <h2>Key Activities Overview</h2>
          <div className="activities-list">
            {keyActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation */}
      <section className="participation">
        <div className="container">
          <h2>Who Can Participate?</h2>
          <div className="participation-content">
            <div className="participation-info">
              <h3>Eligibility Criteria</h3>
              <ul>
                <li>Open to all undergraduate engineering students</li>
                <li>Students interested in technology, engineering, and computer science</li>
                <li>Individual and team registrations are welcome</li>
                <li>No prerequisites required - beginners are encouraged to participate</li>
                <li>Students from all departments (CSE, ISE, IoT, AIML) can register</li>
              </ul>
            </div>
            <div className="participation-benefits">
              <h3>What You'll Gain</h3>
              <ul>
                <li>Hands-on experience with cutting-edge technologies</li>
                <li>Networking opportunities with peers and industry professionals</li>
                <li>Certificates and prizes for outstanding performances</li>
                <li>Enhanced problem-solving and presentation skills</li>
                <li>Exposure to real-world technical challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Reminder */}
      <section className="event-reminder">
        <div className="container">
          <h2>Event Details</h2>
          <div className="reminder-info">
            <div className="reminder-item">
              <strong>📅 Date:</strong> October 11, 2025
            </div>
            <div className="reminder-item">
              <strong>📍 Venue:</strong> Cambridge Institute of Technology, Bangalore
            </div>
            <div className="reminder-item">
              <strong>⏰ Time:</strong> 9:00 AM onwards
            </div>
            <div className="reminder-item">
              <strong>🎯 Registration:</strong> Open until February 10, 2025
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About