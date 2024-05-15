import { Profile } from "@/components/layout/profile";
import { RocksGridBuilder } from "@/components/widget/builder";
import prisma from "@/services/prisma";

type UserProfileProps = {
  params: {
    uid: string;
  };
};

export default async function UserProfile({ params }: UserProfileProps) {
  const userId = params.uid;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return <p>User not found</p>;

  return (
    <div className="container mx-auto py-24 flex divide-y-2">
      <div className="w-1/6">
        <Profile user={user} />
      </div>
      <div className="w-5/2">
        <RocksGridBuilder rocks={[]} />
      </div>
    </div>
  );
}
