import { useState } from 'react';

export default function EditTeamModal({ team, onSave, onCancel }) {
  const [editName, setEditName] = useState(team.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onSave({ ...team, name: editName.trim() });
    }
  };

  return (
    <div className="modal-overlay">
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
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-button">Sauvegarder</button>
            <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
} 