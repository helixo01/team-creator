import { useState } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import { useTeams } from '../../context/TeamsContext';
import StarRating from '../common/StarRating';
import EditTeamModal from './EditTeamModal';

export default function TeamCard({ team }) {
  const { removeTeam, updateTeam } = useTeams();
  const { players, updatePlayer } = usePlayers();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const teamPlayers = players.filter(p => p.teamId === team.id);
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
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.types.includes('application/json')) {
      setIsDragOver(true);
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData('application/json');
      const player = JSON.parse(data);
      
      if (player.teamId !== team.id) {
        updatePlayer(player.id, { teamId: team.id });
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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="team-stats">
          <span>Moyenne: {teamAverage} ★</span>
          <span>{teamPlayers.length} joueurs</span>
        </div>
        
        <div className="team-players">
          {teamPlayers.map(player => (
            <div 
              key={player.id} 
              className="team-player"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, player)}
              onDragEnd={handleDragEnd}
            >
              <div className="team-player-info">
                <span className="team-player-name">{player.name}</span>
                <StarRating rating={player.rating} readonly={true} />
              </div>
              <button 
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  updatePlayer(player.id, { teamId: null });
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