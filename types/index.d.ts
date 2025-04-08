// ArtistDetails MF
declare module "artistDetails/ArtistDetails" {
  import React from "react";

  interface ArtistDetailsProps {
    mbid: string;
    imgUrl: string | null;
  }

  const ArtistDetails: React.FC<ArtistDetailsProps>;
  export default ArtistDetails;
}

// UI MF
declare module "ui/components" {
  import React from "react";

  const Wave: React.FC;

  interface ITitleProps extends React.ComponentProps<"h2"> {
    children?: React.ReactNode;
    size?: "xl" | "lg" | "base";
  }

  const Title: React.FC<ITitleProps>;

  export { Wave, Title };
}

// Last.fm interfaces
type ImageSize = "small" | "medium" | "large" | "extralarge" | "mega";

type Images = {
  size: ImageSize;
  "#text": string;
}[];

interface Artist {
  name: string;
  image: Images;
  listeners: number;
  mbid: string;
  url: string;
}

interface MusicEntity {
  url: string;
  image: Images;
  name: string;
  playcount: number;
}
