import { FC } from "react";

interface ChecklistDividerProps {
  text: string;
}

const ChecklistDivider: FC<ChecklistDividerProps> = ({ text }) => {
  return <h2 className="font-bold mt-2 bg-black/20 p-1">{text}</h2>;
};

export default ChecklistDivider;
