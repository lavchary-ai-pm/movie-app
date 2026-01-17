export interface WatchlistMovie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  dateAdded: string;
}

export interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: WatchlistMovie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  getWatchlistCount: () => number;
  clearWatchlist: () => void;
}
