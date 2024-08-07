import Image from "next/image";
import { FC } from "react";

interface AbilityCheckProps {
  ability: number;
  abilityName: string;
  maxLevel: number;
  icon: string;
}

const AbilityCheck: FC<AbilityCheckProps> = ({
  ability,
  abilityName,
  maxLevel,
  icon,
}) => {
  return (
    <div className="flex my-2 justify-between">
      <div className="flex gap-1">
        <Image
          src={`https://mc.nerothe.com/img/1.20.1/${icon}.png`}
          alt={icon}
          width={24}
          height={24}
        />
        {abilityName}{" "}
      </div>
      {ability !== undefined ? (
        ability < maxLevel ? (
          <span>
            {ability} / {maxLevel}
          </span>
        ) : (
          <span className="text-primary font-bold">{maxLevel}</span>
        )
      ) : (
        <span>
          0 / {maxLevel}
        </span>
      )}
    </div>
  );
};

export default AbilityCheck;
