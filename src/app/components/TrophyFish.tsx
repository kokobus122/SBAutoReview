import { FC, useState } from "react";

import Image from "next/image";
import ColorParse from "./ColorParse";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Title from "./Title";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TrophyFish {
  name: string;
  bronze: number;
  description: string;
  diamond: number;
  display_name: string;
  gold: number;
  highest_tier: string;
  silver: number;
  total: string;
  texture: string;
}

interface TrophyFishProps {
  trophyfishes: TrophyFish[];
}

interface TrophyImage {
  name: string;
  texture: string;
}

const TrophyImage: FC<TrophyImage> = ({ texture, name }) => {
  const imageUrl = `https://www.mc-heads.net/head/${texture}/64`;
  return (
    <Image
      alt={name}
      src={imageUrl}
      width={48}
      height={48}
    />
  );
};

const TrophyFish: FC<TrophyFishProps> = ({ trophyfishes }: TrophyFishProps) => {
  const [checklist, setChecklist] = useState<boolean>(false);

  const checkDiamondFish =
    trophyfishes && trophyfishes.every((trophyfish) => trophyfish.diamond > 0);
  const diaValue = checkDiamondFish ? true : false;

  const bronzeCount =
    trophyfishes &&
    trophyfishes.filter((trophyfish) => trophyfish.bronze > 0).length;
  const silverCount =
    trophyfishes &&
    trophyfishes.filter((trophyfish) => trophyfish.silver > 0).length;
  const goldCount =
    trophyfishes &&
    trophyfishes.filter((trophyfish) => trophyfish.gold > 0).length;
  const diamondCount =
    trophyfishes &&
    trophyfishes.filter((trophyfish) => trophyfish.diamond > 0).length;

  return (
    <section>
      <Title text="Trophy Fish" max={diaValue} />
      <div className="bg-gray-600/40 p-2 rounded-md">
        <div className="flex flex-col md:flex-row gap-4">
          <ul>
            {trophyfishes && bronzeCount < trophyfishes.length ? (
              <li>
                {bronzeCount}/{trophyfishes.length}{" "}
                <span className="text-orange-600">bronze</span> trophies
              </li>
            ) : (
              <li>You best ❤️</li>
            )}
            {trophyfishes && silverCount < trophyfishes.length ? (
              <li>
                {silverCount}/{trophyfishes.length}{" "}
                <span className="text-neutral-300">silver</span> trophies
              </li>
            ) : (
              <li>You best ❤️</li>
            )}
            {trophyfishes && goldCount < trophyfishes.length ? (
              <li>
                {goldCount}/{trophyfishes.length}{" "}
                <span className="text-yellow-400">gold</span> trophies
              </li>
            ) : (
              <li>You best ❤️</li>
            )}
            {trophyfishes && diamondCount < trophyfishes.length ? (
              <li>
                {diamondCount}/{trophyfishes.length}{" "}
                <span className="text-cyan-500">diamond</span> trophies
              </li>
            ) : (
              <li>You best ❤️</li>
            )}
          </ul>
          <div>
            <h3 className="font-bold">Why isn&apos;t * fish showing as maxed?</h3>
            <p>
              Trophy fishes don&apos;t grant progress if you haven&apos;t fished a tier
              below the highest one caught.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {trophyfishes &&
            trophyfishes.map((trophyfish, index) => (
              <div
                key={index}
                className={cn(
                  "bg-gray-900/40 p-2 rounded-md",
                  trophyfish.bronze > 0 && "bg-amber-600/40",
                  trophyfish.bronze > 0 &&
                    trophyfish.silver > 0 &&
                    "bg-gray-400/40",
                  trophyfish.bronze > 0 &&
                    trophyfish.silver > 0 &&
                    trophyfish.gold > 0 &&
                    "bg-yellow-400/40",
                  trophyfish.bronze > 0 &&
                    trophyfish.silver > 0 &&
                    trophyfish.gold > 0 &&
                    trophyfish.diamond > 0 &&
                    "bg-cyan-500/40"
                )}
              >
                <p>
                  {trophyfish.display_name}{" "}
                  {/* if all tiers are caught, show star */}
                  {/* {trophyfish.bronze > 0 &&
                    trophyfish.silver > 0 &&
                    trophyfish.gold > 0 &&
                    trophyfish.diamond > 0 && <span>⭐</span>} */}
                </p>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="hover:cursor-default">
                      <TrophyImage
                        texture={trophyfish.texture}
                        name={trophyfish.name}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-none max-w-64">
                      <ColorParse text={trophyfish.description} />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {checklist ? (
                  <ul className="bg-gray-800/50 rounded-md">
                    <li>
                      <span className="text-orange-600">Bronze</span>{" "}
                      {trophyfish.bronze}
                    </li>
                    <li>
                      <span className="text-neutral-300">Silver</span>{" "}
                      {trophyfish.silver}
                    </li>
                    <li>
                      <span className="text-yellow-400">Gold</span>{" "}
                      {trophyfish.gold}
                    </li>
                    <li>
                      <span className="text-blue-400">Diamond</span>{" "}
                      {trophyfish.diamond}
                    </li>
                    <li>Total caught: {trophyfish.total}</li>
                  </ul>
                ) : null}
              </div>
            ))}
        </div>
      </div>
      <div
        onClick={() => setChecklist(!checklist)}
        className="text-sm flex items-center gap-1 py-2 hover:cursor-pointer"
      >
        <span>Show extra info</span>{" "}
        {checklist ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </div>
    </section>
  );
};

export default TrophyFish;
