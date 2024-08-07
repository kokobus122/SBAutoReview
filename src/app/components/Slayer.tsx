import { FC, useState } from "react";
import Title from "./Title";
import Image from "next/image";
import { formatNumberWithSuffix } from "@/lib/FormatNumber";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CommaNumber } from "@/lib/CommaNumber";

interface kills {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  total: number;
}

interface level {
  currentLevel: number;
  maxLevel: number;
  progress: number;
  xp: number;
  xpForNext: number;
}

interface slayers {
  coins_spent: number;
  head: string;
  kills: kills;
  name: string;
  level: level;
  [key: string]: any; // allow index signature with string
}

interface Slayer {
  slayers: slayers;
  total_coins_spent: number;
  total_slayer_xp: number;
}

interface SlayerProps {
  slayer: Slayer;
}

const SlayerIcon = ({ texture, name }: { texture: string; name: string }) => {
  const textureId = texture.substring(6);
  return (
    <Image
      src={`https://www.mc-heads.net/head/${textureId}/64`}
      alt={name}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

const Slayer: FC<SlayerProps> = ({ slayer }) => {
  const [checklist, setChecklist] = useState<boolean>(false);
  const checkSlayerLevels =
    slayer &&
    Object.values(slayer?.slayers).every(
      (slayerData: any) =>
        slayerData.level.currentLevel === slayerData.level.maxLevel
    );

  return (
    <div>
      <Title text="Slayer" max={checkSlayerLevels} />
      <section className=" bg-gray-600/40 p-2 rounded-md">
        <p>
          Total coins spent{" "}
          {CommaNumber(slayer && slayer.total_coins_spent)}
        </p>
        <p>
          Total XP {formatNumberWithSuffix(slayer && slayer.total_slayer_xp)}
        </p>
        <div className="grid grid-cols-4 gap-4">
          {slayer &&
            Object.keys(slayer?.slayers).map((slayerKey) => {
              const slayerData = slayer?.slayers[slayerKey];
              return (
                <div
                  key={slayerKey}
                  className={cn("rounded-md p-2 bg-gray-900/40")}
                >
                  <div className="max-w-16 mx-auto">
                    <SlayerIcon
                      texture={slayerData.head}
                      name={slayerData.name}
                    />
                  </div>
                  <p className="text-center font-bold pb-2">
                    {slayerData.name}
                  </p>

                  <ul className="flex flex-wrap gap-x-10 gap-y-2 justify-center">
                    <li className="flex flex-col items-center">
                      <p className="font-bold">Tier 1</p>{" "}
                      {slayerData.kills[1] ?? 0}
                    </li>
                    <li className="flex flex-col items-center">
                      <p className="font-bold">Tier 2</p>{" "}
                      {slayerData.kills[2] ?? 0}
                    </li>
                    <li className="flex flex-col items-center">
                      <p className="font-bold">Tier 3</p>{" "}
                      {slayerData.kills[3] ?? 0}
                    </li>
                    <li className="flex flex-col items-center">
                      <p className="font-bold">Tier 4</p>{" "}
                      {slayerData.kills[4] ?? 0}
                    </li>
                    {/* show tier 5 specifically for vampire slayer */}
                    {slayerData.name === "Riftstalker Bloodfiend" ? (
                      <li className="flex flex-col items-center">
                        <p className="font-bold">Tier 5</p>{" "}
                        {slayerData.kills[5] ?? 0}
                      </li>
                    ) : null}
                  </ul>

                  <p>Level {slayerData.level.currentLevel}</p>
                  <div className="relative">
                    <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-semibold">
                      {formatNumberWithSuffix(
                        slayerData && slayerData.level.xp
                      )}
                      {slayerData && slayerData.level.xpForNext === 0 // had to change null to 0
                        ? ""
                        : `/${formatNumberWithSuffix(
                            slayerData && slayerData.level.xpForNext
                          )}`}{" "}
                      XP
                    </p>
                    <Progress
                      indicatorColor={
                        slayerData &&
                        slayerData.level.currentLevel >=
                          slayerData.level.maxLevel
                          ? "bg-primary"
                          : "bg-cyan-500"
                      }
                      className="bg-slate-400"
                      value={
                        slayerData &&
                        slayerData.level.progress === 0 &&
                        slayerData.level.currentLevel ===
                          slayerData.level.maxLevel
                          ? 100
                          : slayerData && slayerData.level.progress * 100
                      }
                      max={100}
                    />
                  </div>
                  {checklist && (
                    <div>
                      <p className="text-sm">
                        Coins spent {CommaNumber(slayerData.coins_spent)}
                      </p>
                      <p className="text-sm">
                        Total kills {slayerData.kills.total}
                      </p>
                    </div>
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

export default Slayer;
