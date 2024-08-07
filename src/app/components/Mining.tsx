"use client";
import { FC, useEffect, useState } from "react";
import Title from "./Title";
import { CommaNumber } from "@/lib/CommaNumber";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumberWithSuffix } from "@/lib/FormatNumber";
import { Progress } from "@/components/ui/progress";
import AbilityCheck from "./AbilityCheck";
import PowderCheck from "./PowderCheck";
import ChecklistDivider from "./ChecklistDivider";

interface Commissions {
  completions: number;
  milestones: number;
}

interface CrystalNucleus {
  times_completed: number;
}

interface Level {
  level: number;
  levelCap: number;
  levelWithProgress: number;
  maxLevel: number;
  progress: number;
  xp: number;
  xpCurrent: number;
  xpForNext: number;
}

interface Powder {
  available: number;
  spent: number;
  total: number;
  [key: string]: any; // allow index signature with string
}

interface Nodes {
  daily_powder: number;
  eager_adventurer: number;
  efficient_miner: number;
  excavator: number;
  forge_time: number;
  fortunate: number;
  gifts_from_the_departed: number;
  great_explorer: number;
  hungry_for_more: number;
  lonesome_miner: number;
  mining_experience: number;
  mining_fortune: number;
  mining_fortune_2: number;
  mining_madness: number;
  mining_speed: number;
  mining_speed_2: number;
  mining_speed_boost: number;
  mole: number;
  no_stone_unturned: number;
  powder_buff: number;
  professional: number;
  rags_to_riches: number;
  special_0: number;
  surveyor: number;
  titanium_insanium: number;
  toggle_efficient_miner: boolean;
  toggle_great_explorer: boolean;
  toggle_mole: boolean;
  warm_hearted: number;
}

interface Tokens {
  available: number;
  spent: number;
  total: number;
}

interface Core {
  crystal_hollows_last_access: number;
  crystal_nucleus: CrystalNucleus;
  level: Level;
  nodes: Nodes;
  powder: Powder;
  tokens: Tokens;
}

interface Mining {
  commissions: Commissions;
  core: Core;
}

interface MiningProps {
  mining: Mining;
}

const Powders = ["lime_dye", "pink_dye", "light_blue_dye"];

const MethodIcons = [
  "https://mc.nerothe.com/img/1.20.1/gold_block.png",
  "https://sky.shiiyu.moe/head/926a248fbbc06cf06e2c920eca1cac8a2c96164d3260494bed142d553026cc6?v6",
  "https://mc.nerothe.com/img/1.20.1/packed_ice.png",
];

const Mining: FC<MiningProps> = ({ mining }) => {
  const hotm = mining && mining.core.level;
  const ability = mining && mining.core.nodes;

  const [gold, setGold] = useState<boolean>(false);
  const [gemstone, setGemstone] = useState<boolean>(false);
  const [mineshaft, setMineshaft] = useState<boolean>(false);
  console.log(ability && ability.efficient_miner)

  const goldMining = () => {
    setGold(!gold);
    setGemstone(false);
    setMineshaft(false);
  };

  const gemstoneMining = () => {
    setGemstone(!gemstone);
    setGold(false);
    setMineshaft(false);
  };

  const mineshaftMining = () => {
    setMineshaft(!mineshaft);
    setGold(false);
    setGemstone(false);
  };

  return (
    <div>
      <Title text="Mining" max={true} />
      <section className="bg-gray-600/40 p-2 rounded-md">
        <article>
          {/* <h3 className="text-lg font-bold">Powder</h3> */}
          <div className="grid grid-cols-3">
            {mining &&
              Object.keys(mining.core.powder).map((powderKey, index) => {
                const powder = mining.core.powder[powderKey];
                return (
                  <div
                    key={powderKey}
                    className="flex gap-2 my-1 mx-auto items-center"
                  >
                    <div
                      className={cn("max-w-8 p-1 rounded-full", {
                        "bg-primary": powder.total >= 20000000,
                        "bg-cyan-500": powder.total < 20000000,
                      })}
                    >
                      <Image
                        src={`https://mc.nerothe.com/img/1.20.1/${Powders[index]}.png`} // Use the powderType variable
                        alt={powderKey}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <span
                        className={cn({
                          "text-primary font-bold ": powder.total >= 20000000,
                          "text-gray-200 ": powder.total < 20000000,
                        })}
                        id={powderKey}
                      >
                        {CommaNumber(powder.total)}
                      </span>{" "}
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="hover:cursor-default">
                            <span>({CommaNumber(powder.available)})</span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-white border-none max-w-64">
                            Unspent powder
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })}
          </div>
        </article>

        {/* hotm level + tree */}
        <article className="py-2 grid grid-cols-12 gap-x-2">
          <div className="col-span-4">
            {/* level display */}
            <h3 className="text-lg font-bold">Heart of the Mountain</h3>
            <p>Tier {hotm && hotm.level}</p>
            <div className="relative">
              <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-semibold">
                {formatNumberWithSuffix(hotm && hotm.xp)}
                {hotm && hotm.xpForNext === null // had to change 0 to null, depends on the object from api
                  ? ""
                  : `/${formatNumberWithSuffix(hotm && hotm.xpForNext)}`}{" "}
                XP
              </p>
              <Progress
                indicatorColor={
                  hotm && hotm.level >= hotm.maxLevel
                    ? "bg-primary"
                    : "bg-cyan-500"
                }
                className="bg-slate-400"
                value={
                  hotm && hotm.progress === 0 && hotm.level === hotm.maxLevel
                    ? 100
                    : hotm && hotm.progress * 100
                }
                max={100}
              />
            </div>

            <article className="py-2">
              <h3 className="text-lg font-bold">Mining methods</h3>
              <ul>
                <li className="flex gap-1 my-1">
                  <Image
                    src={MethodIcons[0]}
                    alt="gold_block"
                    width={24}
                    height={24}
                  />
                  <span
                    className={cn(
                      "hover:text-primary hover:cursor-pointer duration-300",
                      {
                        "text-primary": gold,
                      }
                    )}
                    onClick={() => {
                      goldMining();
                    }}
                  >
                    Gold mining
                  </span>
                </li>
                {/* <ul
                    className={cn(
                      "hidden text-sm bg-gray-900/20 rounded-md px-1 mt-2",
                      { block: gold }
                    )}
                  >
                    <li>
                      {CommaNumber(mining && mining.core.powder.mithril.total)}{" "}
                      Mithril Powder
                    </li>
                  </ul> */}

                <li className="flex gap-1 my-1">
                  <Image
                    src={MethodIcons[1]}
                    alt="gemstone"
                    width={24}
                    height={23}
                  />
                  <span
                    className={cn(
                      "hover:text-primary hover:cursor-pointer duration-300",
                      {
                        "text-primary": gemstone,
                      }
                    )}
                    onClick={() => {
                      gemstoneMining();
                    }}
                  >
                    Gemstone mining
                  </span>
                </li>

                <li className="flex gap-1 my-1">
                  <Image
                    src={MethodIcons[2]}
                    alt="glacite"
                    width={24}
                    height={24}
                  />
                  <span
                    className={cn(
                      "hover:text-primary hover:cursor-pointer duration-300",
                      {
                        "text-primary": mineshaft,
                      }
                    )}
                    onClick={() => {
                      mineshaftMining();
                    }}
                  >
                    Mineshaft mining
                  </span>
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold">Misc</h3>
              <span>
                Commissions completed:{" "}
                {mining && mining.commissions.completions}
              </span>
            </article>
          </div>
          <div className="col-span-8 bg-gray-900/40 p-2 rounded-md min-h-80">
            <h1 className="font-bold pb-1">
              {/* check if a mining method is select and show according title */}
              {gold === false && gemstone === false && mineshaft === false ? (
                <span>No mining method selected</span>
              ) : null}

              {/* specific title for each method */}
              {gold ? (
                <div className="flex gap-1">
                  <Image
                    src={MethodIcons[0]}
                    alt="gold_block"
                    width={24}
                    height={24}
                  />
                  <span>Gold mining checklist</span>
                </div>
              ) : null}

              {gemstone ? (
                <div className="flex gap-1">
                  <Image
                    src={MethodIcons[1]}
                    alt="gemstone"
                    width={24}
                    height={23}
                  />
                  <span>Gemstone mining</span>
                </div>
              ) : null}

              {mineshaft ? (
                <div className="flex gap-1">
                  <Image
                    src={MethodIcons[2]}
                    alt="glacite"
                    width={24}
                    height={24}
                  />
                  <span>Mineshaft mining</span>
                  
                </div>
              ) : null}
            </h1>
            <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto">
              <section className="m-1">
                <h2>HOTM Abilities</h2>
                <ChecklistDivider text="To reach minimum requirements" />
                {/* abilities */}

                {/* GOLD MINING */}
                {gold ? (
                  <article>
                    <AbilityCheck
                      ability={ability && ability.mining_speed}
                      abilityName="Mining Speed"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune}
                      abilityName="Mining Fortune"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_2}
                      abilityName="Mining Speed 2"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune_2}
                      abilityName="Mining Fortune 2"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_boost}
                      abilityName="Mining Speed Boost"
                      maxLevel={1}
                      icon="diamond_pickaxe"
                    />
                  </article>
                ) : null}

                {/* GEMSTONE MINING */}
                {gemstone ? (
                  <article>
                    <AbilityCheck
                      ability={ability && ability.mining_speed}
                      abilityName="Mining Speed"
                      maxLevel={40}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune}
                      abilityName="Mining Fortune"
                      maxLevel={40}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_2}
                      abilityName="Mining Speed 2"
                      maxLevel={40}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune_2}
                      abilityName="Mining Fortune 2"
                      maxLevel={40}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_boost}
                      abilityName="Mining Speed Boost"
                      maxLevel={1}
                      icon="diamond_pickaxe"
                    />

                    <ChecklistDivider text="Recommended requirements" />
                    <AbilityCheck
                      ability={ability && ability.mining_speed}
                      abilityName="Mining Speed"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune}
                      abilityName="Mining Fortune"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_2}
                      abilityName="Mining Speed 2"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune_2}
                      abilityName="Mining Fortune 2"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_boost}
                      abilityName="Mining Speed Boost"
                      maxLevel={1}
                      icon="diamond_pickaxe"
                    />
                  </article>
                ) : null}

                {/* MINESHAFT MINING */}
                {mineshaft ? (
                  <article>
                    <AbilityCheck
                      ability={ability && ability.mining_speed}
                      abilityName="Mining Speed"
                      maxLevel={40}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune}
                      abilityName="Mining Fortune"
                      maxLevel={40}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_2}
                      abilityName="Mining Speed 2"
                      maxLevel={40}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune_2}
                      abilityName="Mining Fortune 2"
                      maxLevel={40}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.efficient_miner}
                      abilityName="Efficient Miner"
                      maxLevel={80}
                      icon="stone_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_boost}
                      abilityName="Mining Speed Boost"
                      maxLevel={1}
                      icon="diamond_pickaxe"
                    />

                    <ChecklistDivider text="Recommended requirements" />
                    <AbilityCheck
                      ability={ability && ability.mining_speed}
                      abilityName="Mining Speed"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune}
                      abilityName="Mining Fortune"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_2}
                      abilityName="Mining Speed 2"
                      maxLevel={50}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_fortune_2}
                      abilityName="Mining Fortune 2"
                      maxLevel={50}
                      icon="emerald"
                    />
                    <AbilityCheck
                      ability={ability && ability.mining_speed_boost}
                      abilityName="Mining Speed Boost"
                      maxLevel={1}
                      icon="diamond_pickaxe"
                    />
                    <AbilityCheck
                      ability={ability && ability.surveyor}
                      abilityName="Surveyor"
                      maxLevel={20}
                      icon="spyglass"
                    />
                    <AbilityCheck
                      ability={mining && mining.core.level.level}
                      abilityName="Peak of the Mountain"
                      maxLevel={9}
                      icon="bedrock"
                    />
                  </article>
                ) : null}
              </section>

              <section className="m-1">
                <h2>Powders</h2>
                <ChecklistDivider text="To reach minimum requirements" />
                {/* GOLD MINING */}
                {gold ? (
                  <article>
                    <PowderCheck
                      powder={mining && mining.core.powder.mithril.total}
                      powderName="Mithril"
                      requiredPowder={3900000}
                      icon="lime_dye"
                    />
                    <PowderCheck
                      powder={mining && mining.core.powder.gemstone.total}
                      powderName="Gemstone"
                      requiredPowder={7400000}
                      icon="pink_dye"
                    />
                  </article>
                ) : null}

                {/* GEMSTONE MINING */}
                {gemstone ? (
                  <article>
                    <PowderCheck
                      powder={mining && mining.core.powder.mithril.total}
                      powderName="Mithril"
                      requiredPowder={4000000}
                      icon="lime_dye"
                    />
                    <PowderCheck
                      powder={mining && mining.core.powder.gemstone.total}
                      powderName="Gemstone"
                      requiredPowder={4000000}
                      icon="pink_dye"
                    />

                    <ChecklistDivider text="Recommended requirements" />
                    <PowderCheck
                      powder={mining && mining.core.powder.mithril.total}
                      powderName="Mithril"
                      requiredPowder={4000000}
                      icon="lime_dye"
                    />
                    <PowderCheck
                      powder={mining && mining.core.powder.gemstone.total}
                      powderName="Gemstone"
                      requiredPowder={12000000}
                      icon="pink_dye"
                    />
                  </article>
                ) : null}

                {/* MINESHAFT MINING */}
                {mineshaft ? (
                  <article>
                    <PowderCheck
                      powder={mining && mining.core.powder.mithril.total}
                      powderName="Mithril"
                      requiredPowder={8000000}
                      icon="lime_dye"
                    />
                    <PowderCheck
                      powder={mining && mining.core.powder.gemstone.total}
                      powderName="Gemstone"
                      requiredPowder={8000000}
                      icon="pink_dye"
                    />

                    <ChecklistDivider text="Recommended requirements" />
                    <PowderCheck
                      powder={mining && mining.core.powder.mithril.total}
                      powderName="Mithril"
                      requiredPowder={8000000}
                      icon="lime_dye"
                    />
                    <PowderCheck
                      powder={mining && mining.core.powder.gemstone.total}
                      powderName="Gemstone"
                      requiredPowder={12000000}
                      icon="pink_dye"
                    />
                  </article>
                ): null}
              </section>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Mining;
