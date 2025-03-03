import { useState } from 'react';
import { useTeams } from '../../context/TeamsContext';

export default function TeamForm() {
  const { addTeam } = useTeams();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeam({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <div className="form-group">
        <label htmlFor="teamName">Nom de l'équipe</label>
        <input
          id="teamName"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Créer l'équipe</button>
    </form>
  );
} 