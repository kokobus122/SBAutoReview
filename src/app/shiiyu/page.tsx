"use client";
import { Progress } from "@/components/ui/progress";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [skyblockLevel, setSkyblockLevel] = useState<any>(null);
  let player: { current?: string; data?: any } = {}; // Move the declaration of 'player' outside of the function and initialize it with an empty object

  const fetchDataFromShiiyu = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        const resultKeys = Object.keys(result.profiles); // get all profile keys from the result object

        // if statement if active profile is yet to be found !!
        if (result.profiles[resultKeys[0]].current === "false") {
          player = result.profiles[resultKeys[0]];
        } else {
          player = result.profiles[resultKeys[1]];
        }

        console.log(player.current); // check if profile is active
        console.log(player.data); // show object data
        setProfileInfo(player.data.profile);
        setSkyblockLevel(player.data.skyblock_level);
        console.log(result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataFromShiiyu();
  }, []);

  return (
    <div>
      <h1>Stats viewer</h1>
      <button onClick={() => fetchDataFromShiiyu()}>Fetch data</button>
      <div>
        <p>{profileInfo && profileInfo.cute_name}</p>
      </div>
      <Progress
        indicatorColor={
          skyblockLevel.level === skyblockLevel.levelCap
            ? "bg-primary"
            : "bg-cyan-500"
        }
        value={skyblockLevel && skyblockLevel.progress * 100}
      />
    </div>
  );
};

export default page;
