import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import CSILogo from './CSILogo'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  
  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="layout">
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="nav-brand">
            <CSILogo />
          </div>
          <nav className="nav-menu">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>
            <Link to="/events" className={`nav-link ${isActive('/events') ? 'active' : ''}`}>
              Events
            </Link>
            <Link to="/registration" className={`nav-link ${isActive('/registration') ? 'active' : ''}`}>
              Registration
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>CSI Event 2025</h4>
              <p>Unleashing Innovation & Technology</p>
            </div>
            <div className="footer-section">
              <h4>Contact Information</h4>
              <p>Cambridge Institute of Technology</p>
              <p>Bangalore, Karnataka, India</p>
              <p>Email: csi@cambridge.edu.in</p>
              <p>Phone: +91-80-12345678</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <p>Stay updated with our latest announcements</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Cambridge Institute of Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout