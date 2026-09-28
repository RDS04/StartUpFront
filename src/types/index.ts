export interface GameService {
  id: string;
  name: string;
  category: 'MOBA' | 'FPS' | 'RPG' | 'Battle Royale';
  image: string;
  rating: number;
  ordersCompleted: number;
  startingPrice: number;
  popular?: boolean;
}

export interface RankTier {
  id: string;
  name: string;
  multiplier: number;
}
