import { useTeams } from '../../context/TeamsContext';
import { usePlayers } from '../../context/PlayersContext';
import { StorageService } from '../../services/storage';

function SaveButton() {
  const { teams } = useTeams();
  const { players } = usePlayers();

  const handleSave = () => {
    const success = StorageService.saveData({ teams, players });
    if (success) {
      alert('Données sauvegardées avec succès !');
    } else {
      alert('Erreur lors de la sauvegarde des données.');
    }
  };

  return (
    <button className="save-button" onClick={handleSave}>
      Sauvegarder
    </button>
  );
}

export default SaveButton; 