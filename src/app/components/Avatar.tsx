import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  uuid: string;
}

const Avatar: FC<AvatarProps> = ({ uuid }) => {
  const formattedUuid = uuid ? uuid.replace(/"/g, "") : "";
  return (
    <Image
      alt={uuid}
      className="rounded-full"
      src={`https://www.mc-heads.net/head/${formattedUuid}/128`}
      width={64}
      height={64}
    />
  );
};

export default Avatar;
