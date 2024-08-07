import React from "react";

const ColorParse: React.FC<{ text: string }> = ({ text }) => {
  const parseColors = (input: string) => {
    const colorCodes: { [key: string]: string } = {
      "§0": "text-black",
      "§1": "text-blue-800",
      "§2": "text-green-800",
      "§3": "text-teal-800",
      "§4": "text-red-800",
      "§5": "text-purple-800",
      "§6": "text-yellow-800",
      "§7": "text-gray-300",
      "§8": "text-gray-500",
      "§9": "text-blue-500",
      "§a": "text-green-500",
      "§b": "text-teal-500",
      "§c": "text-red-500",
      "§d": "text-purple-500",
      "§e": "text-yellow-500",
      "§f": "text-white",
    };

    const segments = input.split(/(§[0-9a-f])/).filter(Boolean);

    return segments.map((segment, index) => {
      if (segment.startsWith("§")) {
        const colorCode = segment.charAt(1);
        const className = colorCodes[colorCode];
        return (
          <span key={index} className={className}>
            {segment.slice(2)}
          </span>
        );
      }
      return <span key={index}>{segment}</span>;
    });
  };

  return <div>{parseColors(text)}</div>;
};

export default ColorParse;
