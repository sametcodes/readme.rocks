import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ConfigForm from "@/components/form";

export default async function EditQueryConfig({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Not signed in</p>;

  const queryConfig = await prisma.platformQueryConfig.findUnique({
    where: { id: params.id },
    include: { platform: true, platformQuery: true },
  });
  if (!queryConfig) return <p>Query config not found</p>;

  const platforms = await prisma.platform.findMany({});

  return (
    <div>
      <h1>Edit Query Config</h1>

      <ConfigForm
        platforms={platforms}
        initialValues={{
          first_n: 5,
        }}
        selected={{
          platformId: queryConfig.platform.id,
          queryId: queryConfig.platformQuery.id,
          schemaName: queryConfig.platformQuery.name,
        }}
      />
    </div>
  );
}
