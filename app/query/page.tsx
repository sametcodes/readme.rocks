import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import { getPlatformQueryConfigs, getPlatformQueries } from "@/services/data";

export default async function Connect() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>Not signed in</h1>
        <p>Sign in to view your configs</p>
      </div>
    );
  }

  const configs = await getPlatformQueryConfigs({
    session,
    params: [],
    payload: {},
  });
  const queries = await prisma.platformQuery.findMany({
    include: { platform: true },
  });

  return (
    <div>
      <h2>Active Queries</h2>
      <table style={{ border: "1px solid #000" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000" }}>Platform</th>
            <th style={{ border: "1px solid #000" }}>Query</th>
            <th style={{ border: "1px solid #000" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs.length === 0 && (
            <tr>
              <td colSpan={3}>No active queries</td>
            </tr>
          )}
          {configs.map((config: any) => (
            <tr key={config.id}>
              <td style={{ border: "1px solid #000" }}>
                {config.platform.name}
              </td>
              <td style={{ border: "1px solid #000" }}>
                {config.platformQuery.title}
              </td>
              <td style={{ border: "1px solid #000" }}>
                <Link href={`/query/edit/${config.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Available Queries</h2>
      <table style={{ border: "1px solid #000" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000" }}>Platform</th>
            <th style={{ border: "1px solid #000" }}>Query</th>
            <th style={{ border: "1px solid #000" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.length === 0 && (
            <tr>
              <td colSpan={3}>No available queries</td>
            </tr>
          )}
          {queries
            .filter(
              (query: any) =>
                !configs.find(
                  (config: any) => config.platformQuery.id === query.id
                )
            )
            .map((query: any) => (
              <tr key={query.id}>
                <td style={{ border: "1px solid #000" }}>
                  {query.platform.name}
                </td>
                <td style={{ border: "1px solid #000" }}>{query.title}</td>
                <td style={{ border: "1px solid #000" }}>
                  <Link href={`/query/create`}>Create</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
