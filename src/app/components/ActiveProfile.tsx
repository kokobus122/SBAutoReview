import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";

interface ProfileProps {
  profileInfo: string;
  cute_name: string;
}

interface ProfilesProps {
  cute_name: string;
  game_mode: string;
  current: boolean;
}

interface ActiveProfileProps {
  profileInfo: ProfileProps;
  profiles: ProfilesProps[];
}

const ActiveProfile: FC<ActiveProfileProps> = ({ profileInfo, profiles }) => {
  return (
    <div className="flex gap-1 text-lg">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="text-gray-200 flex gap-1 duration-300 hover:text-primary hover:cursor-pointer">
          <p>{profileInfo && profileInfo.cute_name}</p>
          <span>
            {profileInfo && profileInfo.cute_name === "Apple"
              ? "🍎"
              : profileInfo && profileInfo.cute_name === "Banana"
              ? "🍌"
              : profileInfo && profileInfo.cute_name === "Blueberry"
              ? "💙"
              : profileInfo && profileInfo.cute_name === "Coconut"
              ? "🥥"
              : profileInfo && profileInfo.cute_name === "Cucumber"
              ? "🥒"
              : profileInfo && profileInfo.cute_name === "Grapes"
              ? "🍇"
              : profileInfo && profileInfo.cute_name === "Kiwi"
              ? "🥝"
              : profileInfo && profileInfo.cute_name === "Lemon"
              ? "🍋"
              : profileInfo && profileInfo.cute_name === "Lime"
              ? "🍈"
              : profileInfo && profileInfo.cute_name === "Mango"
              ? "🥭"
              : profileInfo && profileInfo.cute_name === "Orange"
              ? "🍊"
              : profileInfo && profileInfo.cute_name === "Papaya"
              ? "🍑"
              : profileInfo && profileInfo.cute_name === "Peach"
              ? "🍑"
              : profileInfo && profileInfo.cute_name === "Pear"
              ? "🍐"
              : profileInfo && profileInfo.cute_name === "Pineapple"
              ? "🍍"
              : profileInfo && profileInfo.cute_name === "Pomegranate"
              ? "🍎"
              : profileInfo && profileInfo.cute_name === "Raspberry"
              ? "🍇"
              : profileInfo && profileInfo.cute_name === "Strawberry"
              ? "🍓"
              : profileInfo && profileInfo.cute_name === "Tomato"
              ? "🍅"
              : profileInfo && profileInfo.cute_name === "Watermelon"
              ? "🍉"
              : profileInfo && profileInfo.cute_name === "Zucchini"
              ? "🥒"
              : "Non"}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white bg-gray-800 border-none">
          <DropdownMenuLabel>Profiles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profiles &&
            profiles.map((profile, index) => (
              <DropdownMenuItem
                key={index}
                className="hover:bg-primary hover:cursor-pointer"
              >
                {profile.cute_name}{" "}
                {profile.game_mode === "ironman"
                  ? "♻️"
                  : profile.game_mode === "stranded"
                  ? "🏝️"
                  : " "}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActiveProfile;
