import { FC } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";

interface Member {
  uuid: string;
  display_name: string;
}

interface MemberListProps {
  members: Member[];
}

const MemberList: FC<MemberListProps> = ({ members }: MemberListProps) => {
  return (
    <div>
      <Title text="Members" max={false} />
      <ul>
        {members &&
          members.map((member, index) => (
            <li key={index} className="hover:text-primary duration-300">
              <Link
                href={`/stats/${member.display_name}`}
                className="flex items-center gap-1"
              >
                <Image
                  width={16}
                  height={16}
                  alt={member.uuid}
                  src={`https://crafatar.com/avatars/${member.uuid}`}
                />
                {member.display_name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MemberList;
