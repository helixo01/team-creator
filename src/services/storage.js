const STORAGE_KEY = 'team-creator-data';

export const StorageService = {
  saveData: (data) => {
    try {
      const safeData = {
        teams: Array.isArray(data.teams) ? data.teams : [],
        players: Array.isArray(data.players) ? data.players : []
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  },

  loadData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return { teams: [], players: [] };
      
      const parsedData = JSON.parse(data);
      return {
        teams: Array.isArray(parsedData.teams) ? parsedData.teams : [],
        players: Array.isArray(parsedData.players) ? parsedData.players : []
      };
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return { teams: [], players: [] };
    }
  },

  clearData: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  }
}; 