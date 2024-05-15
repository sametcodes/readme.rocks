import { Session } from "next-auth";
// import NavbarWithLogin from "@/components/layout/navbar";
import NavbarWaitlist from "./navbarWaitlist";

type ILayout = {
  session: Session | null;
  children: React.ReactNode;
};

export default function Layout({ session, children }: ILayout) {
  return (
    <div className="h-screen flex flex-col">
      <header className="container sticky top-0 z-40 mx-auto backdrop-blur-md">
        {/*         <NavbarWithLogin session={session} />
         */}
        <NavbarWaitlist session={session} />
      </header>
      <main>{children}</main>
    </div>
  );
}
