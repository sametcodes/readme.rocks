import { Session } from "next-auth";
import NavbarWithLogin from "@/components/layout/navbar";

type ILayout = {
  session: Session | null;
  children: React.ReactNode;
};

export default function Layout({ session, children }: ILayout) {
  return (
    <div className="flex flex-col">
      <header className="container sticky top-0 z-40 mx-auto">
        <NavbarWithLogin session={session} />
      </header>
      <main>{children}</main>
    </div>
  );
}
