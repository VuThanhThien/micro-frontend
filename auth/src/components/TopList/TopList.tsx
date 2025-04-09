import React from "react";
import useSWR from "swr";
import { fetcher } from "@utils/fetcher";
import ListItem from "@components/ListItem";
import { Title, Wave } from "core/components";

interface ITopListProps {
  mbid: string;
  type: "track" | "album";
}

const TopList: React.FC<ITopListProps> = ({ type, mbid }) => {
  const { data, isLoading } = useSWR(
    `/?method=artist.gettop${
      type === "album" ? "albums" : "tracks"
    }&mbid=${mbid}&format=json&limit=10`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="h-[420px] flex items-center justify-center">
        <Wave />
      </div>
    );

  const items: MusicEntity[] =
    (type === "album" ? data.topalbums.album : data.toptracks.track) ?? [];

  return (
    <div className="flex-1 basis-auto">
      <Title size="base">Top {type === "album" ? "Albums" : "Tracks"}</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {items.map((entity) => (
          <ListItem key={entity.name} {...entity} />
        ))}
      </div>
    </div>
  );
};

export default TopList;
