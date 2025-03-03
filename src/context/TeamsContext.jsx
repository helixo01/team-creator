import { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

const TeamsContext = createContext();

const DEFAULT_TEAMS = [
  { id: '1', name: 'Équipe 1', players: [] },
  { id: '2', name: 'Équipe 2', players: [] }
];

export function TeamsProvider({ children }) {
  const [teams, setTeams] = useState(DEFAULT_TEAMS);

  // Charger les données uniquement au démarrage
  useEffect(() => {
    const data = StorageService.loadData();
    if (data.teams && data.teams.length > 0) {
      setTeams(data.teams);
    }
  }, []);

  const addTeam = (team) => {
    setTeams(prev => [...prev, { 
      ...team, 
      id: crypto.randomUUID(),
      players: []
    }]);
  };

  const removeTeam = (teamId) => {
    setTeams(prev => prev.filter(t => t.id !== teamId));
  };

  const updateTeam = (teamId, updates) => {
    setTeams(prev => prev.map(t => 
      t.id === teamId ? { ...t, ...updates } : t
    ));
  };

  const updateTeamPositions = (newTeams) => {
    setTeams(newTeams);
  };

  const clearAllTeams = () => {
    setTeams(DEFAULT_TEAMS);
  };

  return (
    <TeamsContext.Provider value={{
      teams,
      addTeam,
      removeTeam,
      updateTeam,
      updateTeamPositions,
      clearAllTeams
    }}>
      {children}
    </TeamsContext.Provider>
  );
}

const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamsProvider');
  }
  return context;
};

export { useTeams }; 