import React from 'react';
import './NavBar.scss';
import Experience from '../Experience/Experience';
import Projects from '../Projects/Projects';
import Home from '../Home/Home';
import Hero from '../Hero/Hero';

const NavBar = () => {
  const [activePage, setActivePage] = React.useState('home');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
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
  };

  return (
    <div className="app-container">
      <Hero/>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__content">
            <div className="navbar__desktop-menu">
              <div className="nav-items">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`navbar__link ${activePage === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          {renderContent()}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;