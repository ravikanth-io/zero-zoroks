import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { PROFILE } from './constants';
import { MenuIcon, XIcon, SunIcon, MoonIcon, RabbitIcon } from './components/Icons';
import { CyberChat } from './components/CyberChat';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Payments from './pages/Payments';
import Contact from './pages/Contact';

// ScrollToTop Component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NavBar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certs' },
    { path: '/payments', label: 'Payments' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/90 dark:bg-cyber-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-cyber-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-mono font-bold text-gray-900 dark:text-white tracking-tighter flex items-center group">
              <RabbitIcon className="w-6 h-6 text-cyber-green mr-2 group-hover:animate-pulse" />
              <span>RK</span>
              <span className="text-cyber-green ml-1">_</span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map(item => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => 
                    `${isActive ? 'text-cyber-green font-bold' : 'text-gray-600 dark:text-gray-400'} hover:text-cyber-green transition-colors font-mono text-sm uppercase tracking-wider`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`text-cyber-green mr-1 ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>{'>'}</span>
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-cream-100 dark:bg-cyber-gray text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-cream-100 dark:bg-cyber-gray text-gray-800 dark:text-yellow-400"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white p-2"
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream dark:bg-cyber-gray border-b border-gray-200 dark:border-cyber-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navItems.map(item => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium font-mono ${isActive ? 'text-cyber-green bg-cream-100 dark:bg-black/20' : 'text-gray-700 dark:text-gray-300 hover:text-cyber-green'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  // Initialize as false for Light Mode default
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-cream dark:bg-cyber-dark text-gray-900 dark:text-cyber-text font-sans flex flex-col pt-16 transition-colors duration-300">
        <NavBar isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-cream dark:bg-black border-t border-gray-200 dark:border-cyber-border text-center mt-auto transition-colors duration-300">
          <p className="text-gray-600 text-sm font-mono flex items-center justify-center gap-2">
            © {new Date().getFullYear()} {PROFILE.name}. <RabbitIcon className="w-4 h-4 text-cyber-green" /> All systems operational.
          </p>
        </footer>

        {/* Chat Bot Overlay */}
        <CyberChat />
      </div>
    </Router>
  );
};

export default App;