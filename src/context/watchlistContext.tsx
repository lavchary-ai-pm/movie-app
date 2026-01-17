import React, { useContext, useState, useEffect, useCallback } from "react";
import { saveWatchlist, getWatchlist } from "@/utils/helper";
import { WatchlistMovie, WatchlistContextType } from "@/types/watchlist";

const context = React.createContext<WatchlistContextType>({
  watchlist: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  isInWatchlist: () => false,
  getWatchlistCount: () => 0,
  clearWatchlist: () => {},
});

interface Props {
  children: React.ReactNode;
}

const initialWatchlist = getWatchlist();

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>(initialWatchlist);

  // Sync to localStorage whenever watchlist changes
  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const addToWatchlist = useCallback((movie: WatchlistMovie) => {
    setWatchlist((prev) => {
      // Prevent duplicates
      if (prev.some((item) => item.id === movie.id)) {
        console.log("Movie already in watchlist");
        return prev;
      }
      return [...prev, { ...movie, dateAdded: new Date().toISOString() }];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number): boolean => {
      return watchlist.some((item) => item.id === movieId);
    },
    [watchlist]
  );

  const getWatchlistCount = useCallback((): number => {
    return watchlist.length;
  }, [watchlist]);

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  return (
    <context.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        getWatchlistCount,
        clearWatchlist,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
