import React, { memo } from "react";
import { Card, CardFooter, Image, Spacer } from "@nextui-org/react";
import { getArtistImage } from "@utils/getArtistImage";
import useSWR from "swr";

interface IArtistCardProps {
  artist: Artist;
  onPress: (mbid: string, imgUrl: string) => void;
}

const ArtistCard: React.FC<IArtistCardProps> = ({ artist, onPress }) => {
  const { data: url, isLoading } = useSWR(artist.mbid, getArtistImage);
  return (
    <Card
      isPressable
      isFooterBlurred
      onPress={() => onPress(artist.mbid, url)}
      radius="lg"
      className="group border-none"
    >
      <Image
        alt={artist.name}
        className="object-cover object-top"
        height={300}
        width={300}
        src={url}
        isLoading={isLoading}
        isZoomed
      />
      <CardFooter className="transition-all h-[50px] group-hover:h-[100px] pointer-events-none block border-white/10 border-1 overflow-hidden py-3 absolute rounded-large bottom-2 w-[calc(100%_-_16px)] shadow-small ml-2 z-10">
        <p className="text-base text-center text-white/90 font-medium">
          {artist.name}
        </p>
        <Spacer y={3} />
        <div
          className="text-sm text-white bg-black/20 w-full rounded-full h-10 flex items-center justify-center"
          color="default"
        >
          Show more
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(ArtistCard);
