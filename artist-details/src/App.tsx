import ArtistDetails from "@components/ArtistDetails";

function App() {
  return (
    <div className="w-full max-w-[1440px] bg-black text-white">
      <ArtistDetails
        mbid="c8b03190-306c-4120-bb0b-6f2ebfc06ea9"
        imgUrl="https://commons.wikimedia.org/wiki/Special:Redirect/file/File:The_Weeknd_2015.jpg"
      />
    </div>
  );
}

export default App;
