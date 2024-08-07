"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface PlayerLookupProps {}

const PlayerLookupComponent: FC<PlayerLookupProps> = ({}) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    router.push(`/stats/${data.username}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <Input
        placeholder="Username"
        className="h-12 w-96 bg-gray-600/70 border-none text-center text-lg placeholder:text-center autofill:text-white autofill:text autofill:shadow-[inset_0_0_0px_1000px_rgb(75,85,99,40)] placeholder:text-white"
        autoFocus
        required
        {...register("username")}
      />
      <Button type="submit" className="font-bold">
        SHOW
      </Button>
    </form>
  );
};

export default PlayerLookupComponent;
