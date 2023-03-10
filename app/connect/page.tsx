import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import actions from "@/services/oauth/actions";

import Image from "next/image";
import prisma from "@/services/prisma";

export default async function Connect() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>Connect</h1>
        <p>You must be signed in to connect your accounts.</p>
      </div>
    );
  }
  const activeConnections = await actions.getAllConnections({ session });
  const platforms = await prisma.platform.findMany({
    where: { require_auth: true },
  });

  const nonConnectedPlatforms = platforms.filter((platform) => {
    return !activeConnections.find(
      (connection) => connection.platform.code === platform.code
    );
  });

  return (
    <div>
      <h2>Connected Platforms ({activeConnections.length})</h2>
      <ul>
        {activeConnections.map((activeConnection) => {
          return (
            <li key={activeConnection.id}>
              <span>{activeConnection.platform.name}</span> ―
              <span>
                {activeConnection.profile && (
                  <>
                    <ProfileCard profile={activeConnection.profile} />
                    <a
                      href={`/api/oauth/disconnect/${activeConnection.platform.code}`}
                    >
                      {" "}
                      (disconnect)
                    </a>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <h2>Connect new platform ({nonConnectedPlatforms.length})</h2>
      <ul>
        {nonConnectedPlatforms.map((platform) => {
          return (
            <li key={platform.code}>
              <a href={`/api/oauth/connect/${platform.code}`}>
                Connect to {platform.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type IProfileCard = {
  (props: { profile: { name: string; image: string } }): JSX.Element;
};

const ProfileCard: IProfileCard = ({ profile }) => {
  return (
    <>
      <Image
        src={profile.image}
        alt={profile.name}
        width={30}
        height={30}
        style={{ display: "inline-block" }}
      />
      <span>{profile.name}</span>
    </>
  );
};
