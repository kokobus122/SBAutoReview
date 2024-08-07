"use client";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: any) => {
    router.push(`/stats/${data.username}`);
  };
  return (
    <nav className="bg-gray-800/70 flex justify-between items-center h-12 px-4">
      <Link href="/" className="text-white">Home</Link>
      {pathname === "/" ? null : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="h-10 bg-gray-100/20 border-none text-white placeholder:text-white"
            placeholder="Username"
            required
            {...register("username")}
          />
        </form>
      )}
      <Settings2 className="invisible" />
    </nav>
  );
};

export default Navbar;
