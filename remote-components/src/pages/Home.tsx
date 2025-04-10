import { Title, Wave } from "components";

function Home() {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
      <Wave />
      <Title>Hello, world</Title>
    </div>
  );
}

export default Home;
