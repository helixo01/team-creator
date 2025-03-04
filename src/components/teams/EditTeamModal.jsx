import { useState, useEffect } from 'react';

export default function EditTeamModal({ team, onSave, onCancel }) {
  const [editName, setEditName] = useState(team.name);

  useEffect(() => {
    // Empêcher le défilement du body quand la modale est ouverte
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onSave({ ...team, name: editName.trim() });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content edit-team-modal">
        <h3>Modifier l'équipe</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamName">Nom de l'équipe</label>
            <input
              type="text"
              id="teamName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              placeholder="Entrez le nom de l'équipe"
            />
          </div>
          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onCancel}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={!editName.trim()}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 