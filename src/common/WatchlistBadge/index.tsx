import { memo, FC } from "react";

import { useWatchlist } from "@/context/watchlistContext";

const WatchlistBadge: FC = () => {
  const { getWatchlistCount } = useWatchlist();
  const count = getWatchlistCount();

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-[#ff0000] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default memo(WatchlistBadge);
