import NextImage from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <div className="container mx-auto w-full lg:w-3/4 px-8 lg:px-0 h-full">
      <div className="my-52 flex flex-col gap-5 justify-between">
        <div>
          <h2 className="text-5xl font-bold">
            Rock your <em>readme.md</em>
          </h2>
          <p className="mt-5 font-light text-lg max-w-[550px]">
            Have a better Readme.md for your Github profile,or repositories.
            Manifest your work with integrating data from various platforms.
          </p>
        </div>
        <Link href="/build">
          <button className="h-11 px-5 mt-5 font-semibold rounded-lg border-purple-500 border-[1px] text-purple-500 hover:bg-gray-200 dark:hover:bg-gray-800 max-w-fit">
            Open builder
          </button>
        </Link>
      </div>

      <div className="hidden lg:block absolute h-full w-[45%] top-[30px] -right-8">
        <NextImage
          src="/assets/views.svg"
          alt="Views of components"
          fill
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
