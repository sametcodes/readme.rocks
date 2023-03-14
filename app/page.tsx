export default function Index() {
  return (
    <>
      <header className="container mx-auto w-full h-[60px] flex justify-between items-center">
        <div className="w-1/2 h-[60px] flex justify-start items-center">
          <h1 className="font-bold">DEVSTATS</h1>
        </div>
        <div className="w-1/2 h-[60px] flex justify-end items-center gap-x-4">
          <i>github</i>
          <button className="w-auto h-11 px-4 bg-red-400 text-white font-bold rounded-lg">
            login
          </button>
        </div>
      </header>
      <main className="bg-statistics bg-fixed bg-contain bg-no-repeat">
        <div className="container mx-auto pt-20">
          <h2 className="text-6xl font-bold tracking-tight">
            all your <br /> statistic at one
          </h2>
          <p className="mt-5 font-semibold text-lg tracking-wider">
            <span className="font-bold text-red-400">Choose</span> platforms,
            get graphs, <br />
            <span className="font-bold text-blue-400">customize</span> styles,
            <span className="font-bold text-yellow-400">download</span> as svg
            for
            <br />
            your Github profile.
          </p>
          <button className="w-auto h-11 px-5 mt-5 bg-red-400 text-white font-semibold rounded-lg">
            get graphs &gt;
          </button>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
