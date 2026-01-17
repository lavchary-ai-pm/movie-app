import { memo, FC } from "react";
import { Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";

import { watchBtn, textColor } from "@/styles";
import { cn } from "@/utils/helper";

const EmptyWatchlistState: FC = () => {

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <MdLocalMovies className="text-[80px] dark:text-gray-700 text-gray-300 mb-6" />
      <h2 className={cn("sm:text-2xl text-xl font-bold mb-2", textColor)}>
        Your watchlist is empty
      </h2>
      <p className="dark:text-gray-400 text-gray-600 mb-8 text-center max-w-md">
        Start adding movies and TV shows you want to watch!
      </p>
      <Link
        to="/movie"
        className={cn(
          watchBtn,
          "bg-[#ff0000] shadow-glow text-white hover:shadow-glow active:shadow-glow"
        )}
      >
        Browse Movies
      </Link>
    </div>
  );
};

export default memo(EmptyWatchlistState);
