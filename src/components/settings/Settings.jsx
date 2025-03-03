import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeSwitch.css';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <button 
        className="settings-button" 
        onClick={() => setIsOpen(true)}
        title="Paramètres"
      >
        <i className="fas fa-cog"></i>
      </button>

      <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="settings-header">
          <h2>Paramètres</h2>
          <button 
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="settings-content">
          <div className="settings-section">
            <h3>Thème</h3>
            <div className="switch">
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={toggleTheme}
                name="theme-toggle"
                id="theme-toggle"
              />
              <label htmlFor="theme-toggle">
                <i className="bulb">
                  <span className="bulb-center"></span>
                  <span className="filament-1"></span>
                  <span className="filament-2"></span>
                  <span className="reflections">
                    <span></span>
                  </span>
                  <span className="sparks">
                    <i className="spark1"></i>
                    <i className="spark2"></i>
                    <i className="spark3"></i>
                    <i className="spark4"></i>
                  </span>
                </i>
              </label>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="settings-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
} 