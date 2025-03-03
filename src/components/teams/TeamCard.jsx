import { useState } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import { useTeams } from '../../context/TeamsContext';
import StarRating from '../common/StarRating';
import EditTeamModal from './EditTeamModal';

const getPositionLabel = (position) => {
  const mainPositions = ['T', 'J', 'M', 'A', 'S'];
  if (position < mainPositions.length) {
    return mainPositions[position];
  }
  return `R${position - mainPositions.length + 1}`;
};

export default function TeamCard({ team }) {
  const { removeTeam, updateTeam } = useTeams();
  const { players, updatePlayer } = usePlayers();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedOverPosition, setDraggedOverPosition] = useState(null);
  
  const teamPlayers = players
    .filter(p => p.teamId === team.id)
    .sort((a, b) => (a.position || 0) - (b.position || 0));

  const teamAverage = teamPlayers.length 
    ? (teamPlayers.reduce((sum, p) => sum + p.rating, 0) / teamPlayers.length).toFixed(1)
    : 0;

  const handleDragStart = (e, player) => {
    // Empêcher le drag si on clique sur le bouton de suppression
    if (e.target.closest('.remove-button')) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify(player));
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedOverPosition(null);
  };

  const handleDragOver = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.types.includes('application/json')) {
      setIsDragOver(true);
      setDraggedOverPosition(position);
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDraggedOverPosition(null);
  };

  const handleDrop = (e, dropPosition) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDraggedOverPosition(null);

    try {
      const data = e.dataTransfer.getData('application/json');
      const draggedPlayer = JSON.parse(data);
      
      if (draggedPlayer.teamId === team.id) {
        // Réorganisation au sein de la même équipe
        const updatedPlayers = teamPlayers.map(p => {
          if (p.id === draggedPlayer.id) {
            return { ...p, position: dropPosition };
          }
          // Ajuster les positions des autres joueurs
          if ((p.position || 0) >= dropPosition && p.id !== draggedPlayer.id) {
            return { ...p, position: (p.position || 0) + 1 };
          }
          return p;
        });
        
        updatedPlayers.forEach(p => {
          updatePlayer(p.id, { position: p.position });
        });
      } else {
        // Nouveau joueur dans l'équipe
        const maxPosition = Math.max(...teamPlayers.map(p => p.position || 0), -1);
        updatePlayer(draggedPlayer.id, { 
          teamId: team.id,
          position: maxPosition + 1
        });
      }
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  };

  const handleEditSave = (updatedTeam) => {
    updateTeam(updatedTeam);
    setIsEditing(false);
  };

  return (
    <div className="team-card">
      <div className="team-header">
        <h3>{team.name}</h3>
        <div className="team-actions">
          <button 
            className="edit-icon" 
            title="Modifier l'équipe"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-pen"></i>
          </button>
          <button 
            className="delete-button" 
            title="Supprimer l'équipe"
            onClick={() => removeTeam(team.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div 
        className={`team-content ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, teamPlayers.length)}
        onDragLeave={handleDragLeave}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, teamPlayers.length)}
      >
        <div className="team-stats">
          <span>Moyenne: {teamAverage} ★</span>
          <span>{teamPlayers.length} joueurs</span>
        </div>
        
        <div className="team-players">
          {teamPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`team-player ${draggedOverPosition === index ? 'drag-over' : ''}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, player)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="team-player-info">
                <span className="team-player-position" title={`Position ${index + 1}`}>
                  {getPositionLabel(index)}
                </span>
                <span className="team-player-name">{player.name}</span>
                <StarRating rating={player.rating} readonly={true} />
              </div>
              <button 
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  updatePlayer(player.id, { teamId: null, position: null });
                }}
                title="Retirer le joueur"
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
          ))}
          
          {teamPlayers.length === 0 && (
            <div className={`team-drop-zone empty ${isDragOver ? 'drag-over' : ''}`}>
              Glissez des joueurs ici
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <EditTeamModal 
          team={team}
          onSave={handleEditSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
} 