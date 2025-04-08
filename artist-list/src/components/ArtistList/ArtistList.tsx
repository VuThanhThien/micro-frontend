import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Spacer } from "@nextui-org/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { fetcher } from "@utils/fetcher";
import { filterByPhoto } from "utils/filterByPhoto";

import ArtistCard from "@components/ArtistCard";
import ArtistDetails from "artistDetails/ArtistDetails";
import { Wave, Title } from 'ui/components';

interface IArtistListProps {
  children?: React.ReactNode;
}

export interface ArtistsResponse {
  artists: {
    artist: Artist[];
  };
}

const ArtistList: React.FC<IArtistListProps> = () => {
  const [selectedArtistMbid, setSelectedArtistMbid] = useState<string | null>(
    null
  );
  const [selectedArtistImgUrl, setSelectedArtistImgUrl] = useState<
    string | null
  >(null);
  
  const close = () => setSelectedArtistMbid(null);

  const { data, isLoading } = useSWR<ArtistsResponse>(
    "/?method=chart.gettopartists&format=json&limit=11",
    fetcher
  );

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () =>
      window.removeEventListener("keydown", closeOnEscapePressed);
  }, []);

  const onArtistPress = (mbid: string, imgUrl: string) => {
    setSelectedArtistMbid(mbid);
    setSelectedArtistImgUrl(imgUrl);
  };

  if (isLoading) return <Wave />;

  if (!data) return <Title>Sorry, no data found</Title>;

  return (
    <LayoutGroup>
      <Title className="mx-auto" size="xl">
        Last.fm Top Artists
      </Title>
      <Spacer y={6} />
      <div className="flex gap-4 flex-wrap justify-center">
        {data.artists.artist.filter(filterByPhoto).map((a) => (
          <motion.div key={a.mbid} layoutId={a.mbid}>
            <ArtistCard
              artist={a}
              onPress={onArtistPress}
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedArtistMbid && (
          <motion.div
            key="modal"
            className="fixed z-10 top-0 left-0 flex w-full h-full place-content-center place-items-center pointer-events-none px-4 md:p-10"
          >
            <motion.div
              layoutId={selectedArtistMbid}
              className="relative overflow-hidden w-full h-full bg-background shadow-lg border border-white/15 pointer-events-auto will-change-transform p-4 md:p-10 rounded-xl flex-auto z-[9999] overflow-y-auto"
            >
              <ArtistDetails
                mbid={selectedArtistMbid}
                imgUrl={selectedArtistImgUrl}
              />
              <button onClick={close} className="absolute right-5 top-4 text-white/80 text-lg">
                &#x2715;
              </button>
            </motion.div>
            <motion.div
              key="backdrop"
              className={
                "absolute z-20 top-0 left-0 w-full h-full supports-backdrop-blur:dark:bg-black/40 backdrop-blur-md cursor-pointer pointer-events-auto bg-black/40"
              }
              onClick={close}
              variants={{
                hidden: {
                  opacity: 0,
                  transition: {
                    duration: 0.16,
                  },
                },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.04,
                    duration: 0.2,
                  },
                },
              }}
              initial="hidden"
              exit="hidden"
              animate="visible"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default ArtistList;
