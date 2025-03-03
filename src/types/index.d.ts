interface Player {
  id: string;
  name: string;
  rating: number; // Note de 0 à 5
  teamId?: string;
  position?: number; // Position dans l'équipe (0, 1, 2, etc.)
}

interface Team {
  id: string;
  name: string;
  players: string[]; // IDs des joueurs
} 