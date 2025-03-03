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

export default function PlayerCard({ player }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editRating, setEditRating] = useState(player.rating);
  const { updatePlayer } = usePlayers();

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(player));
    e.dataTransfer.effectAllowed = 'move';
    
    // Ajouter une classe pour le style pendant le drag
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove('dragging');
  };

  const handleSave = (updates) => {
    updatePlayer(player.id, updates);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={`player-card ${isDragging ? 'dragging' : ''}`}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
            readonly={true}
          />
        </div>
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