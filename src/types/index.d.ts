interface Player {
  id: string;
  name: string;
  rating: number; // Note de 0 à 5
  teamId?: string;
}

interface Team {
  id: string;
  name: string;
  players: string[]; // IDs des joueurs
} 