import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import ConfigForm from "@/components/form";

export default async function CreateQueryConfig() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>Not signed in</h1>
        <p>Sign in to create new config</p>
      </div>
    );
  }

  const platforms = await prisma.platform.findMany({});
  return (
    <div>
      <h1>Create Query Config</h1>

      <ConfigForm platforms={platforms} />
    </div>
  );
}
