import { useState } from 'react';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

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
            <h3>Apparence</h3>
            <div className="setting-item">
              <label>
                <input type="checkbox" /> Mode sombre
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Équipes</h3>
            <div className="setting-item">
              <label>
                <input type="checkbox" /> Trier par moyenne
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" /> Afficher les statistiques
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Joueurs</h3>
            <div className="setting-item">
              <label>
                <input type="checkbox" /> Trier par niveau
              </label>
            </div>
            <div className="setting-item">
              <label>Nombre maximum de joueurs par équipe</label>
              <input type="number" min="1" max="20" defaultValue="6" />
            </div>
          </div>

          <div className="settings-section">
            <h3>Exportation</h3>
            <div className="setting-item">
              <button className="export-button">
                <i className="fas fa-download"></i>
                Exporter les données
              </button>
            </div>
            <div className="setting-item">
              <button className="import-button">
                <i className="fas fa-upload"></i>
                Importer des données
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="settings-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
} 