"use client";
import ActiveProfile from "@/app/components/ActiveProfile";
import Avatar from "@/app/components/Avatar";
import Dungeons from "@/app/components/Dungeons";
import MemberList from "@/app/components/MemberList";
import Mining from "@/app/components/Mining";
import Skills from "@/app/components/Skills";
import SkinViewer from "@/app/components/SkinViewer";
import Slayer from "@/app/components/Slayer";
import TrophyFish from "@/app/components/TrophyFish";
import { Progress } from "@/components/ui/progress";
import { FC, useEffect, useState } from "react";

interface pageProps {
  userName: string;
}

const page: FC<pageProps> = ({}) => {
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [skyblockLevel, setSkyblockLevel] = useState<any>(null);
  const [skin, setSkin] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [trophyFish, setTrophyFish] = useState<any>(null);
  const [crimsonIsle, setCrimsonIsle] = useState<any>(null);
  const [members, setMembers] = useState<any>(null);
  const [uuid, setUuid] = useState<any>(null);
  const [skills, setSkills] = useState<any>(null);
  const [profiles, setProfiles] = useState<any>(null);
  const [dungeons, setDungeons] = useState<any>(null);
  const [slayer, setSlayer] = useState<any>(null);
  const [mining, setMining] = useState<any>(null);

  let player: { current?: string; data?: any } = {};

  useEffect(() => {
    const slug = window.location.pathname.split("/stats/")[1];
    document.title = `${slug} | SB Auto Review`;

    const fetchDataFromShiiyu = async ({ userName }: pageProps) => {
      try {
        const response = await fetch("/api/stats", {
          method: "POST",
          body: JSON.stringify({ playerName: userName }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          const resultKeys = Object.keys(result.profiles); // get all profile keys from the result object

          player = result.profiles[resultKeys[0]];

          // using social to get the active profile
          for (let i = 0; i < 5; i++) {
            if (!player.data.skills.skills.social) {
              player = result.profiles[resultKeys[i]];
            } else {
              break;
            }
          }

          // console.log(result.profiles);
          console.log(player.current); // check if profile is active
          console.log(player.data); // show object data
          setProfileInfo(player.data.profile);
          setSkyblockLevel(player.data.skyblock_level);
          setSkin(player.data.skin_data);
          setUserName(player.data.display_name);
          // setCrimsonIsle(player.data.crimson_isle.trophy_fish);
          setTrophyFish(player.data.crimson_isle.trophy_fish.fish);
          setSkills(Object.values(player.data.skills.skills));
          setMembers(player.data.members);
          setUuid(player.data.uuid);
          setProfiles(Object.values(result.profiles));
          setDungeons(player.data.dungeons);
          setSlayer(player.data.slayer);
          setMining(player.data.mining)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataFromShiiyu({ userName: slug });
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl">
            {userName}{" "}
            <span>
              {profileInfo && profileInfo.game_mode === "ironman"
                ? "♻️"
                : profileInfo && profileInfo.game_mode === "stranded"
                ? "🏝️"
                : " "}
              <ActiveProfile profileInfo={profileInfo} profiles={profiles} />
            </span>
          </h1>
          <Avatar uuid={uuid} />
        </div>
        <MemberList members={members} />
      </div>
      <div className="my-2">
        <p>Level {skyblockLevel && skyblockLevel.level}</p>
        <div className="relative">
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white">
            {skyblockLevel && skyblockLevel.progress * 100}/100
          </p>
          <Progress
            indicatorColor={
              skyblockLevel && skyblockLevel.progress * 100 === 100
                ? "bg-primary"
                : "bg-cyan-500"
            }
            className="bg-slate-400"
            value={skyblockLevel && skyblockLevel.progress * 100}
          />
        </div>
      </div>

      <Mining mining={mining} />
      <Skills skill={skills} skin={skin} />
      <TrophyFish trophyfishes={trophyFish} />
      <Dungeons dungeons={dungeons} />
      <Slayer slayer={slayer} />
    </div>
  );
};

export default page;
