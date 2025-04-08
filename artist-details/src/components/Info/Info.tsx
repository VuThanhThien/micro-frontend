import React from "react";
import useSWR from "swr";
import { fetcher } from "@utils/fetcher";
import { Title, Wave } from "ui/components";

interface IInfoProps {
  mbid: string;
}

const Info: React.FC<IInfoProps> = ({ mbid }) => {
  const { data: info, isLoading } = useSWR(
    `/?method=artist.getinfo&mbid=${mbid}&format=json`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="h-[360px] flex items-center justify-center">
        <Wave />
      </div>
    );

  return (
    <div className="flex-1">
      <Title size="base" className="leading-none mb-3">
        {info.artist.name}
      </Title>
      <div className="lg:h-[316px] overflow-y-scroll scrollbar-hide">
        <p className="text-sm bg-gradient-to-br from-slate-100 to-slate-500 bg-clip-text tracking-tight text-transparent">
          {info.artist.bio.content}
        </p>
      </div>
    </div>
  );
};

export default Info;
