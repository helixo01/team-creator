import { usePlayers } from '../../context/PlayersContext';
import { useTeams } from '../../context/TeamsContext';
import { StorageService } from '../../services/storage';

export default function ResetButton() {
  const { clearAllPlayers } = usePlayers();
  const { clearAllTeams } = useTeams();

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir tout effacer ?')) {
      clearAllPlayers();
      clearAllTeams();
      StorageService.clearData();
    }
  };

  return (
    <button 
      className="reset-button"
      onClick={handleReset}
      title="Effacer toutes les données"
    >
      Réinitialiser
    </button>
  );
} 