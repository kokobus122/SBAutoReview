import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Title from "./Title";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumberWithSuffix } from "@/lib/FormatNumber";

interface SkillsInfo {
  level: number;
  levelCap: number;
  levelWithProgress: number;
  maxLevel: number;
  progress: number;
  rank: number;
  uncappedLevel: number;
  xp: number;
  xpCurrent: number;
  xpForNext: number;
}

interface Skin{
  skinurl: string;
}

interface SkillsProps {
  skill: SkillsInfo[];
  skin: Skin;
}

const skillNames = [
  { name: "Taming", item: "ghast_spawn_egg" },
  { name: "Farming", item: "golden_hoe" },
  { name: "Mining", item: "stone_pickaxe" },
  { name: "Combat", item: "stone_sword" },
  { name: "Foraging", item: "jungle_sapling" },
  { name: "Fishing", item: "fishing_rod" },
  { name: "Enchanting", item: "enchanting_table" },
  { name: "Alchemy", item: "brewing_stand" },
  { name: "Carpentry", item: "crafting_table" },
  { name: "Runecrafting", item: "magma_cream" },
  { name: "Social", item: "emerald" },
];

const Skills: FC<SkillsProps> = ({ skill, skin }: SkillsProps) => {
  const [info, setInfo] = useState<boolean>(false);
  const toggleInfo = () => {
    setInfo(!info);
  };


  // change icon to player's head
  const skinUrl = skin?.skinurl;
  const skinId = skinUrl?.split("/").pop();

  useEffect(() => {
    const faviconUrl = `https://mc-heads.net/head/${skinId}/128`;
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.setAttribute("href", faviconUrl);
    }
  }, []);


  // Check if the first 8 skills are maxed. Carpentry, runecrafting, and social is not taken into account
  const max = skill && skill.slice(0, 8).every((s) => s.level === s.levelCap);

  return (
    <section>
      <Title text="Skills" max={max} />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-gray-600/40 p-2 rounded-md">
        {skill &&
          skill.map((skill, index) => (
            <div key={index}>
              <div className="flex gap-2 items-center py-1">
                <div
                  className={cn(
                    "p-1 rounded-full",
                    skill.level === skill.levelCap
                      ? "bg-primary"
                      : "bg-cyan-500"
                  )}
                >
                  <Image
                    alt={skillNames[index].name}
                    src={`https://mc.nerothe.com/img/1.20.1/${skillNames[index].item}.png`}
                    width={24}
                    height={24}
                  />
                </div>
                <p>
                  {skillNames[index].name}{" "}
                  {skill.level === skill.levelCap ? (
                    <span className="font-bold text-primary">
                      {skill.level}
                    </span>
                  ) : (
                    <span className="text-gray-200">{skill.level}</span>
                  )}{" "}
                </p>
              </div>
              <div className="relative">
                <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-semibold">
                  {formatNumberWithSuffix(skill.xpCurrent)}
                  {skill.xpForNext === null
                    ? ""
                    : `/${formatNumberWithSuffix(skill.xpForNext)}`}{" "}
                  XP
                </p>
                <Progress
                  indicatorColor={
                    skill.level === skill.levelCap
                      ? "bg-primary"
                      : "bg-cyan-500"
                  }
                  className="bg-slate-400"
                  value={
                    skill.progress === 0 && skill.level === skill.levelCap
                      ? 100
                      : skill.progress * 100
                  }
                  max={100}
                />
              </div>
              {info && (
                <div className="text-sm bg-gray-900/20 rounded-md px-1 mt-2">
                  <p>Current cap: {skill.levelCap}</p>
                  <p>
                    Level with progress:{" "}
                    {formatNumberWithSuffix(
                      parseFloat(skill.levelWithProgress.toFixed(2))
                    )}
                  </p>
                  <p>Max level: {skill.maxLevel}</p>
                  <p>Rank: #{skill.rank}</p>
                  <p>
                    Total XP: {formatNumberWithSuffix(Math.floor(skill.xp))} XP
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div
        onClick={toggleInfo}
        className="text-sm flex items-center gap-1 py-2 hover:cursor-pointer"
      >
        <span>Show extra info</span>{" "}
        {info ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </div>
    </section>
  );
};

export default Skills;
