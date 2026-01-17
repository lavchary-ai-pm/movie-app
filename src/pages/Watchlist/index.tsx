import { lazy, Suspense, FC } from "react";
import { m } from "framer-motion";

import WatchlistMovieCard from "./WatchlistMovieCard";
import { useWatchlist } from "@/context/watchlistContext";
import { maxWidth } from "@/styles";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/utils/helper";

const EmptyWatchlistState = lazy(() =>
  import("@/common/EmptyWatchlistState").then((module) => ({
    default: module.default,
  }))
);

const Watchlist: FC = () => {
  const { watchlist, getWatchlistCount } = useWatchlist();
  const { staggerContainer, fadeDown } = useMotion();
  const count = getWatchlistCount();

  return (
    <main className="dark:bg-black bg-mainColor min-h-screen pt-[100px] pb-10">
      <div className={cn(maxWidth, "py-10")}>
        {/* Header */}
        <m.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <div className="relative inline-block">
            <m.h1
              variants={fadeDown}
              className="sm:text-3xl xs:text-2xl text-xl font-bold dark:text-gray-50 text-black"
            >
              My Watchlist
            </m.h1>
            <div className="line" />
          </div>
          <m.p
            variants={fadeDown}
            className="dark:text-gray-400 text-gray-600 mt-2 text-sm sm:text-base"
          >
            {count === 0
              ? "No movies yet"
              : `${count} ${count === 1 ? "movie" : "movies"}`}
          </m.p>
        </m.div>

        {/* Content */}
        {count === 0 ? (
          <Suspense fallback={<div />}>
            <EmptyWatchlistState />
          </Suspense>
        ) : (
          <m.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6"
          >
            {watchlist.map((movie) => (
              <m.div key={movie.id} variants={fadeDown}>
                <WatchlistMovieCard movie={movie} />
              </m.div>
            ))}
          </m.div>
        )}
      </div>
    </main>
  );
};

export default Watchlist;
