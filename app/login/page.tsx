import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import UserLogin from "@/components/user";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return <UserLogin session={session} />;
}
