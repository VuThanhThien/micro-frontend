import React from "react";
import Info from "@components/Info";
import TopList from "@components/TopList";

interface IArtistDetailsProps {
  mbid: string;
  imgUrl: string;
}

const ArtistDetails: React.FC<IArtistDetailsProps> = ({ mbid, imgUrl }) => {
  return (
    <div className="p-6 flex flex-nowrap flex-col lg:!flex-row gap-10">
      <div className="w-[360px] shrink-0 mx-auto sm:mx-0">
        <img
          className="w-[360px] h-[360px] object-cover object-top rounded-xl"
          src={imgUrl}
        />
      </div>
      <div className="flex-1">
        <Info mbid={mbid} />
        <div className="flex flex-wrap justify-between gap-4 mt-10">
          <TopList mbid={mbid} type="album" />
          <TopList mbid={mbid} type="track" />
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
