import { useTeams } from '../../context/TeamsContext';
import TeamCard from './TeamCard';
import { useState } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import Modal from '../common/Modal';
import EditForm from '../common/EditForm';

export default function TeamList() {
  const { teams, updateTeamPositions, removeTeam, updateTeam } = useTeams();
  const [draggedTeam, setDraggedTeam] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const { updatePlayer } = usePlayers();

  const handleDragStart = (e, team) => {
    setDraggedTeam(team);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedTeam(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const card = e.target.closest('.team-card');
    if (card && draggedTeam) {
      const draggedIndex = teams.findIndex(t => t.id === draggedTeam.id);
      const targetIndex = teams.findIndex(t => t.id === card.dataset.teamId);
      if (draggedIndex !== targetIndex) {
        // Réorganiser les équipes
        const newTeams = [...teams];
        const [removed] = newTeams.splice(draggedIndex, 1);
        newTeams.splice(targetIndex, 0, removed);
        updateTeamPositions(newTeams);
      }
    }
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
  };

  const handleSaveTeam = (updates) => {
    updateTeam(editingTeam.id, updates);
    setEditingTeam(null);
  };

  const handleSavePlayer = (updates) => {
    updatePlayer(editingPlayer.id, updates);
    setEditingPlayer(null);
  };

  if (teams.length === 0) {
    return <div className="empty-list">Aucune équipe créée</div>;
  }

  return (
    <>
      <div className="teams-list">
        <h2>Équipes</h2>
        <div className="teams-grid" onDragOver={handleDragOver}>
          {teams.map(team => (
            <div
              key={team.id}
              className="team-card"
              draggable
              data-team-id={team.id}
              onDragStart={(e) => handleDragStart(e, team)}
              onDragEnd={handleDragEnd}
            >
              <div className="team-header">
                <h3>{team.name}</h3>
                <div className="team-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleEditTeam(team)}
                    title="Modifier l'équipe"
                  >
                    ✎
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => removeTeam(team.id)}
                    title="Supprimer l'équipe"
                  >
                    ×
                  </button>
                </div>
              </div>
              <TeamCard 
                team={team} 
                onEdit={handleEditPlayer}
              />
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!editingTeam} onClose={() => setEditingTeam(null)}>
        <EditForm
          item={editingTeam}
          onSave={handleSaveTeam}
          onCancel={() => setEditingTeam(null)}
          type="équipe"
        />
      </Modal>

      <Modal isOpen={!!editingPlayer} onClose={() => setEditingPlayer(null)}>
        <EditForm
          item={editingPlayer}
          onSave={handleSavePlayer}
          onCancel={() => setEditingPlayer(null)}
          type="joueur"
        />
      </Modal>
    </>
  );
} 