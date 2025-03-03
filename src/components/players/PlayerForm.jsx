import { useState } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import StarRating from '../common/StarRating';

function PlayerForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const { addPlayer } = usePlayers();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addPlayer({ name, rating });
      setName('');
      setRating(0);
    }
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Ajouter un joueur</h3>
      
      <div className="form-group">
        <label htmlFor="playerName">Nom du joueur</label>
        <input
          type="text"
          id="playerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez le nom"
          required
        />
      </div>

      <div className="rating-container">
        <label>Niveau du joueur</label>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating}
        />
      </div>

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default PlayerForm; 