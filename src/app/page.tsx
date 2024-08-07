import { FC } from "react";
import PlayerLookup from "./components/PlayerLookup";

interface pageProps {}

const page: FC<pageProps> = ({}) => {

  return (
    <div className="max-w-2xl mx-auto mt-[20%]">
      <h1 className="font-bold text-3xl text-center my-4">Skyblock Auto Review</h1>
      <PlayerLookup />
    </div>
  );
};

export default page;
