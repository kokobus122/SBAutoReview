import { CommaNumber } from "@/lib/CommaNumber";
import Image from "next/image";
import { FC } from "react";

interface PowderCheckProps {
  powder: number;
  powderName: string;
  requiredPowder: number;
  icon: string;
}

const PowderCheck: FC<PowderCheckProps> = ({
  powder,
  powderName,
  requiredPowder,
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
        {powderName}{" "}
      </div>
      {powder < requiredPowder ? (
        <span>
          {CommaNumber(powder)} / {CommaNumber(requiredPowder)}
        </span>
      ) : (
        <span className="text-primary font-bold">{CommaNumber(powder)}</span>
        // <p><span className="text-primary font-bold">{CommaNumber(powder)}</span> / {requiredPowder}</p>
      )}
    </div>
  );
};

export default PowderCheck;
