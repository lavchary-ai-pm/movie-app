import { useState, memo, FC } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import { useWatchlist } from "@/context/watchlistContext";
import { IMovie } from "@/types";
import { WatchlistMovie } from "@/types/watchlist";
import { cn } from "@/utils/helper";

interface WatchlistButtonProps {
  movieId: number | string;
  movie: IMovie;
  category: string;
  className?: string;
  size?: "small" | "medium";
}

const WatchlistButton: FC<WatchlistButtonProps> = ({
  movieId,
  movie,
  category,
  className,
  size = "medium",
}) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const inWatchlist = isInWatchlist(Number(movieId));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);

    if (inWatchlist) {
      removeFromWatchlist(Number(movieId));
    } else {
      const movieData = movie as any;
      const watchlistMovie: WatchlistMovie = {
        id: Number(movie.id),
        title: movie.original_title || movie.name || "Unknown Title",
        name: movie.name,
        poster_path: movie.poster_path,
        vote_average: movieData.vote_average || 0,
        media_type: (category === "tv" ? "tv" : "movie") as "movie" | "tv",
        release_date: movieData.release_date,
        first_air_date: movieData.first_air_date,
        dateAdded: new Date().toISOString(),
      };
      addToWatchlist(watchlistMovie);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300",
        size === "medium" && "w-9 h-9 text-lg",
        size === "small" && "w-7 h-7 text-base",
        inWatchlist
          ? "bg-[#ff0000] text-white shadow-glow"
          : "dark:bg-[rgba(0,0,0,0.6)] bg-[rgba(255,255,255,0.8)] dark:text-gray-200 text-gray-800",
        "hover:scale-110 active:scale-95",
        isAnimating && "animate-pulse",
        className
      )}
    >
      {inWatchlist ? <AiOutlineCheck /> : <AiOutlinePlus />}
    </button>
  );
};

export default memo(WatchlistButton);
