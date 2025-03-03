import { useTeams } from '../../context/TeamsContext';
import TeamCard from './TeamCard';

export default function TeamList() {
  const { teams } = useTeams();

  return (
    <div className="teams-list">
      <div className="teams-list-header">
        <h2>Équipes ({teams.length})</h2>
      </div>
      <div className="teams-grid">
        {teams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
} 