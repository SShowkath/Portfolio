import React from 'react';
import './MobileNav.scss';
import Experience from '../Experience/Experience';
import Projects from '../Projects/Projects';
import Hero from '../Hero/Hero';
import Home from '../Home/Home';

const MobileNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState('home');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <div>
            <Hero/>
            <Home />
            </div>;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      default:
        return <Home />;
    }
  };

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <div className="app-container">
      <nav className="mobile-navbar">
        <button 
          className="hamburger-button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`dropdown-menu ${isOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`menu-item ${activePage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      
      
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default MobileNav;