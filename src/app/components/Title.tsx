import { FC } from "react";

interface TitleProps {
  text: string;
  max: boolean;
}

const Title: FC<TitleProps> = ({ text, max }) => {
  return (
    <h1 className="text-2xl font-bold text-white">
      {text}
      {max && <span>⭐</span>}
    </h1>
  );
};

export default Title;
