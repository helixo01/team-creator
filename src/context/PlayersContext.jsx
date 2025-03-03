import { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);

  // Charger les données uniquement au démarrage
  useEffect(() => {
    const data = StorageService.loadData();
    if (data.players) {
      setPlayers(data.players);
    }
  }, []);

  const addPlayer = (player) => {
    setPlayers(prev => [...prev, { 
      ...player, 
      id: crypto.randomUUID(),
      rating: Math.max(0, Math.min(5, player.rating))
    }]);
  };

  const removePlayer = (playerId) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const updatePlayer = (playerId, updates) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, ...updates } : p
    ));
  };

  const assignToTeam = (playerId, teamId) => {
    updatePlayer(playerId, { teamId });
  };

  const clearAllPlayers = () => {
    setPlayers([]);
  };

  return (
    <PlayersContext.Provider value={{
      players,
      addPlayer,
      removePlayer,
      updatePlayer,
      assignToTeam,
      clearAllPlayers
    }}>
      {children}
    </PlayersContext.Provider>
  );
}

const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
};

export { usePlayers }; 