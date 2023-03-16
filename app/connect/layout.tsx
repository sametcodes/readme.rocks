export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mx-auto lg:w-1/2 my-[50px] px-8 lg:px-0">
      {children}
    </div>
  );
}
