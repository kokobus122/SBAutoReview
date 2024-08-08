import { FC } from "react";
import Title from "../components/Title";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section>
      <Title max={false} text="About / Info" />
      <ul className="bg-gray-600/40 space-y-4 p-2 rounded-md">
        <li>
          Website made by{" "}
          <Link href="https://www.kokobus.me/" className="text-primary">
            kokobus
          </Link>
          .
        </li>
        <li>
          Source code on GitHub:{" "}
          <Link
            href="https://github.com/kokobus122/SBAutoReview"
            className="text-primary"
          >
            https://github.com/kokobus122/SBAutoReview
          </Link>
        </li>
        <li>
          Skyblock API:{" "}
          <Link href="https://sky.shiiyu.moe/" className="text-primary">
            https://sky.shiiyu.moe/
          </Link>
        </li>
        <li>
          Item API:{" "}
          <Link href="https://mc.nerothe.com/" className="text-primary">
            https://mc.nerothe.com/
          </Link>
        </li>
        <li>
          Skin API:{" "}
          <Link href="https://minecraft-heads.com/" className="text-primary">
            https://minecraft-heads.com/
          </Link>
        </li>
        <li>For further inquiries, you can reach me on discord at @kokobus.</li>
      </ul>
    </section>
  );
};

export default page;
