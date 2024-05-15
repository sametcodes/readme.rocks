import { User } from "@prisma/client";
import NextImage from "next/image";

type ProfileType = {
  user: User;
};

export const Profile = ({ user }: ProfileType) => {
  return (
    <div className="flex flex-col justify-center  items-center py-3">
      {user.image && (
        <NextImage
          className="rounded-full border-gray-300 border"
          alt={user.name || ""}
          src={user.image}
          width={200}
          height={200}
        />
      )}
      <p className="text-3xl py-4">{user.name}</p>
    </div>
  );
};
