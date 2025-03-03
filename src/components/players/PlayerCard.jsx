import { useState } from 'react';
import StarRating from '../common/StarRating';
import { usePlayers } from '../../context/PlayersContext';

function EditPlayerModal({ player, onSave, onCancel }) {
  const [editName, setEditName] = useState(player.name);
  const [editRating, setEditRating] = useState(player.rating);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onSave({ name: editName, rating: editRating });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-player-modal">
        <h3>Modifier le joueur</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="playerName">Nom</label>
            <input
              type="text"
              id="playerName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="rating-container">
            <label>Niveau</label>
            <StarRating 
              rating={editRating} 
              onRatingChange={setEditRating}
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

function PlayerCard({ player, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updatePlayer } = usePlayers();

  const handleSave = (updates) => {
    updatePlayer(player.id, updates);
    setIsEditing(false);
  };

  return (
    <>
      <div className="player-card">
        <div className="player-header">
          <h3>{player.name}</h3>
          <button 
            className="edit-icon" 
            onClick={() => setIsEditing(true)}
            title="Modifier le joueur"
          >
            <i className="fas fa-pen"></i>
          </button>
        </div>
        <div className="player-rating">
          <StarRating 
            rating={player.rating} 
            onRatingChange={() => {}}
          />
        </div>
        {onRemove && (
          <button className="remove-button" onClick={() => onRemove(player.id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      {isEditing && (
        <EditPlayerModal 
          player={player}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default PlayerCard; 