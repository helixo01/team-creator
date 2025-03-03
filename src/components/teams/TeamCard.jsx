import { usePlayers } from '../../context/PlayersContext';

export default function TeamCard({ team, onEdit }) {
  const { players, updatePlayer, removePlayer } = usePlayers();
  
  const teamPlayers = players.filter(player => player.teamId === team.id);
  
  // Calcul de la moyenne de l'équipe
  const teamAverage = teamPlayers.length 
    ? (teamPlayers.reduce((sum, player) => sum + player.rating, 0) / teamPlayers.length).toFixed(1)
    : 0;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    try {
      const playerData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (playerData && playerData.id) {
        updatePlayer(playerData.id, { teamId: team.id });
      }
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  };

  const handleRemovePlayer = (playerId) => {
    updatePlayer(playerId, { teamId: null });
  };

  const handleDeletePlayer = (playerId) => {
    removePlayer(playerId);
  };

  return (
    <div 
      className="team-content"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="team-stats">
        <span>Moyenne: {teamAverage} ★</span>
        <span>{teamPlayers.length} joueurs</span>
      </div>
      <div className="team-players">
        {teamPlayers.map(player => (
          <div key={player.id} className="team-player-card">
            <div className="player-info">
              <span>{player.name}</span>
              <div className="player-rating">
                {'★'.repeat(player.rating)}
                {'☆'.repeat(5 - player.rating)}
              </div>
            </div>
            <div className="player-actions">
              <button 
                className="edit-button"
                onClick={() => onEdit(player)}
                title="Modifier le joueur"
              >
                ✎
              </button>
              <button 
                className="remove-button"
                onClick={() => handleRemovePlayer(player.id)}
                title="Retirer de l'équipe"
              >
                ↩
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeletePlayer(player.id)}
                title="Supprimer le joueur"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 