import { FC, useState } from "react";
import Title from "./Title";
import Image from "next/image";
import { format } from "date-fns";
import { formatNumberWithSuffix } from "@/lib/FormatNumber";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface most_damage {
  class: string;
  value: number;
}
interface stats {
  best_score: number;
  fastest_time: number;
  milestone_completions: number;
  mobs_killed: number;
  tier_completions: number;
  times_played: number;
}

interface CatacombsFloor {
  icon_texture: string;
  most_damage: most_damage;
  name: string;
  stats: stats;
}

interface level {
  level: number;
  levelCap: number;
  levelwithprogress: number;
  maxLevel: number;
  progress: number;
  rank: number;
  uncappedLevel: number;
  xp: number;
  xpCurrent: number;
  xpForNext: number;
}

interface Catacombs {
  completions: number;
  floors: { [key: string]: CatacombsFloor }; // Update the type to object
  highest_floor: string;
  id: string;
  level: level;
}

interface Dungeons {
  catacombs: Catacombs;
  master_catacombs: Catacombs;
}

interface DungeonsProps {
  dungeons: Dungeons;
}

const CapitalizeLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// todo: xp/hr
const FloorExp = (floor: Catacombs) => [
  { name: "entrance", time: floor.floors["entrance"].stats.fastest_time },
  { name: "floor_1", time: floor.floors["floor_1"].stats.fastest_time },
  { name: "floor_2", time: floor.floors["floor_2"].stats.fastest_time },
  { name: "floor_3", time: floor.floors["floor_3"].stats.fastest_time },
  { name: "floor_4", time: floor.floors["floor_4"].stats.fastest_time },
  { name: "floor_5", time: floor.floors["floor_5"].stats.fastest_time },
  { name: "floor_6", time: floor.floors["floor_6"].stats.fastest_time },
  { name: "floor_7", time: floor.floors["floor_7"].stats.fastest_time },
];

interface IconProps {
  texture: string;
  name: string;
}

const DungeonIcon: FC<IconProps> = ({ texture, name }) => {
  const imageUrl = `https://www.mc-heads.net/head/${texture}/64`;
  return (
    <Image
      alt={name}
      src={imageUrl}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

const Dungeons: FC<DungeonsProps> = ({ dungeons }) => {
  const [checklist, setChecklist] = useState<boolean>(false);

  const dungeoneering = dungeons && dungeons.catacombs.level;
  // current max is 50, if cap is increased, change to dungeoneering.levelCap
  const checkForMax = dungeoneering && dungeoneering.level >= 50 ? true : false;
  return (
    <div>
      <Title text="Dungeons" max={checkForMax} />
      <section className="bg-gray-600/40 p-2 rounded-md">
        <div className="flex gap-4">
          <div className="w-96">
            <div className="flex gap-2 items-center py-1">
              <div
                className={cn(
                  "p-1 rounded-full",
                  dungeoneering && dungeoneering.level >= 50
                    ? "bg-primary"
                    : "bg-cyan-500"
                )}
              >
                <Image
                  alt={"catacombs"}
                  src={`https://mc.nerothe.com/img/1.20.1/wither_skeleton_skull.png`}
                  width={24}
                  height={24}
                />
              </div>
              <p>
                Catacombs{" "}
                {dungeoneering &&
                dungeoneering.level >= dungeoneering.levelCap ? (
                  <span className="font-bold text-primary">
                    {dungeoneering && dungeoneering.level}
                  </span>
                ) : (
                  <span className="text-gray-200">
                    {dungeoneering && dungeoneering.level}
                  </span>
                )}{" "}
              </p>
            </div>
            <div className="relative">
              <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-semibold">
                {formatNumberWithSuffix(
                  dungeoneering && dungeoneering.xpCurrent
                )}
                {dungeoneering && dungeoneering.xpForNext === null
                  ? ""
                  : `/${formatNumberWithSuffix(
                      dungeoneering && dungeoneering.xpForNext
                    )}`}{" "}
                XP
              </p>
              <Progress
                indicatorColor={
                  dungeoneering && dungeoneering.level >= dungeoneering.levelCap
                    ? "bg-primary"
                    : "bg-cyan-500"
                }
                className="bg-slate-400"
                value={
                  dungeoneering &&
                  dungeoneering.progress === 0 &&
                  dungeoneering.level === dungeoneering.levelCap
                    ? 100
                    : dungeoneering && dungeoneering.progress * 100
                }
                max={100}
              />
            </div>
          </div>
          <div className="bg-gray-900/40 grow flex items-center p-1 rounded-md">
            <p>Best EXP/HR:  </p>
          </div>
        </div>

        {/* normal cata */}
        <div className="grid grid-cols-4 gap-4 pt-4">
          {dungeons &&
            Object.keys(dungeons?.catacombs?.floors).map((floorKey) => {
              const floor = dungeons.catacombs.floors[floorKey];
              return (
                <div
                  key={floorKey}
                  className={cn(
                    "p-2 rounded-md text-center",
                    floor.stats?.best_score >= 300
                      ? "bg-gray-900/40"
                      : "bg-red-900/40"
                  )}
                >
                  <div className="max-w-16 mx-auto">
                    <DungeonIcon
                      texture={floor.icon_texture}
                      name={floor.name}
                    />
                  </div>
                  <h2 className="font-bold">
                    {CapitalizeLetter(floor.name.replace(/_/g, " "))}
                  </h2>
                  {checklist && (
                    <ul>
                      <li>Best score: {floor.stats?.best_score}</li>
                      <li>
                        Fastest time:{" "}
                        {format(floor.stats?.fastest_time, "mm:ss")}
                      </li>
                      <li>
                        Milestone completions:{" "}
                        {floor.stats?.milestone_completions}
                      </li>
                      <li>Mobs killed: {floor.stats?.mobs_killed}</li>
                      <li>Tier completions: {floor.stats?.tier_completions}</li>
                      <li>Times played: {floor.stats?.times_played}</li>
                    </ul>
                  )}
                </div>
              );
            })}
        </div>

        {/* master mode */}
        <div className="grid grid-cols-4 gap-4 pt-4">
          {dungeons &&
            Object.keys(dungeons?.master_catacombs?.floors).map((floorKey) => {
              const floor = dungeons.master_catacombs.floors[floorKey];
              return (
                <div
                  key={floorKey}
                  className={cn(
                    "p-2 rounded-md text-center",
                    floor.stats?.best_score >= 300
                      ? "bg-gray-900/40"
                      : "bg-red-900/40"
                  )}
                >
                  <div className="max-w-16 mx-auto">
                    <DungeonIcon
                      texture={floor.icon_texture}
                      name={floor.name}
                    />
                  </div>
                  <h2 className="font-bold">
                    {CapitalizeLetter(floor.name.replace(/_/g, " "))}
                  </h2>
                  {checklist && (
                    <ul>
                      <li>Best score: {floor.stats?.best_score}</li>
                      <li>
                        Fastest time:{" "}
                        {floor.stats?.fastest_time
                          ? format(floor.stats?.fastest_time, "mm:ss")
                          : "No completion"}
                      </li>
                      <li>
                        Milestone completions:{" "}
                        {floor.stats?.milestone_completions}
                      </li>
                      <li>Mobs killed: {floor.stats?.mobs_killed}</li>
                      <li>Tier completions: {floor.stats?.tier_completions}</li>
                      <li>Times played: {floor.stats?.times_played}</li>
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </section>
      <div
        onClick={() => setChecklist(!checklist)}
        className="text-sm flex items-center gap-1 py-2 hover:cursor-pointer"
      >
        <span>Show extra info</span>{" "}
        {checklist ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </div>
    </div>
  );
};

export default Dungeons;
