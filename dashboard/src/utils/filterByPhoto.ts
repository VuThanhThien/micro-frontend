export const filterByPhoto = (artist: Artist) => {
  // exclude mbids with no photo
  const excludeMbids = [
    "381086ea-f511-4aba-bdf9-71c753dc5077",
    "b49b81cc-d5b7-4bdd-aadb-385df8de69a6",
  ];
  return !!artist.mbid && !excludeMbids.includes(artist.mbid);
};
