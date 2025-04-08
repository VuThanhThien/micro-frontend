import axios from "axios";

export const getArtistImage = async (mbid: string) => {
  try {
    const res = await axios.get(
      `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`
    );
    const relations = res.data.relations;

    for (let i = 0; i < relations.length; i++) {
      if (relations[i].type === "image") {
        let image_url = relations[i].url.resource;
        if (image_url.startsWith("https://commons.wikimedia.org/wiki/File:")) {
          const filename = image_url.substring(image_url.lastIndexOf("/") + 1);
          image_url =
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/" +
            filename;
        }
        if (!image_url) console.log(relations);
        console.log(image_url);
        return image_url;
      }
    }
  } catch (error) {
    throw error;
  }
};
