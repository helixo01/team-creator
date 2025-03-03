import { useRef, useState, useEffect } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import PlayerCard from './PlayerCard';

function PlayerList() {
  const { players } = usePlayers();
  const scrollContainerRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [players]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const availablePlayers = players.filter(player => !player.teamId);

  return (
    <div className="players-list">
      {showScrollButtons && (
        <button 
          className="scroll-button scroll-left" 
          onClick={() => scroll('left')}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      
      <h2>Joueurs disponibles ({availablePlayers.length})</h2>
      
      <div 
        className="players-grid" 
        ref={scrollContainerRef}
        onScroll={checkScrollable}
      >
        {availablePlayers.map(player => (
          <PlayerCard 
            key={player.id} 
            player={player}
          />
        ))}
      </div>

      {showScrollButtons && (
        <button 
          className="scroll-button scroll-right"
          onClick={() => scroll('right')}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}

export default PlayerList; 