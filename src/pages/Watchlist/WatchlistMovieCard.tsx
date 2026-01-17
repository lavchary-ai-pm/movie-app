import { memo, FC } from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "usehooks-ts";

import Image from "@/common/Image";
import { useWatchlist } from "@/context/watchlistContext";
import { WatchlistMovie } from "@/types/watchlist";

interface WatchlistMovieCardProps {
  movie: WatchlistMovie;
}

const WatchlistMovieCard: FC<WatchlistMovieCardProps> = ({ movie }) => {
  const { removeFromWatchlist } = useWatchlist();
  const isMobile = useMediaQuery("(max-width: 380px)");

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWatchlist(movie.id);
  };

  const displayTitle =
    movie.title?.length > 50 ? movie.title.split(":")[0] : movie.title || movie.name || "Unknown Title";

  return (
    <div className="relative">
      <Link
        to={`/${movie.media_type}/${movie.id}`}
        className="dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden block"
      >
        <Image
          height={!isMobile ? 250 : 216}
          width={170}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={displayTitle}
          className="object-cover rounded-lg drop-shadow-md shadow-md group-hover:shadow-none group-hover:drop-shadow-none transition-all duration-300 ease-in-out"
          effect="zoomIn"
        />

        {/* Hover overlay with YouTube icon */}
        <div className="absolute top-0 left-0 w-[170px] h-full group-hover:opacity-100 opacity-0 bg-[rgba(0,0,0,0.6)] transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="xs:text-[48px] text-[42px] text-[#ff0000] scale-[0.4] group-hover:scale-100 transition-all duration-300">
            <FaYoutube />
          </div>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove from watchlist"
          className="absolute top-2 right-2 w-7 h-7 bg-[rgba(0,0,0,0.8)] hover:bg-[#ff0000] text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
        >
          <IoMdClose className="text-lg" />
        </button>
      </Link>

      <h4 className="dark:text-gray-300 text-center cursor-default sm:text-base xs:text-[14.75px] text-[14px] font-medium mt-3">
        {displayTitle}
      </h4>
    </div>
  );
};

export default memo(WatchlistMovieCard);
