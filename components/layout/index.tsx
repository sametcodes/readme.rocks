import { Session } from "next-auth";
import NavbarWithLogin from "@/components/layout/navbar";

type ILayout = {
  session: Session | null;
  children: React.ReactNode;
};

export default function Layout({ session, children }: ILayout) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-40 bg-white mx-auto">
        <NavbarWithLogin session={session} />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
