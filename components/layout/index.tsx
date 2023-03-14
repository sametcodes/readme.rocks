import { Session } from "next-auth";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import Login from "@/components/layout/login";

type ILayout = {
  session: Session | null;
  children: React.ReactNode;
};

const items = [
  {
    title: "Queries",
    href: "/query",
  },
  {
    title: "Connect",
    href: "/connect",
  },
];

export default function Layout({ session, children }: ILayout) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-40 bg-white mx-auto">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <Navbar items={items} />
          <Login session={session} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}
