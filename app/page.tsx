export default function Index() {
  return (
    <div className="bg-statistics bg-fixed bg-contain bg-no-repeat h-screen w-screen landing">
      <div className="container mx-auto pt-20 w-full lg:w-2/3 px-8 lg:px-0">
        <h2 className="text-6xl font-bold tracking-tight">
          all your <br /> statistic at one
        </h2>
        <p className="mt-5 font-semibold text-lg tracking-wider">
          <span className="font-bold text-red-400">Choose</span> platforms, get
          graphs, <br />
          <span className="font-bold text-blue-400">customize</span> styles,
          <span className="font-bold text-yellow-400">download</span> as svg for
          <br />
          your Github profile.
        </p>
        <button className="w-auto h-11 px-5 mt-5 bg-red-400 text-white font-semibold rounded-lg">
          get graphs &gt;
        </button>
      </div>
    </div>
  );
}
