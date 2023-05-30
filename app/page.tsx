import {
  LandingBrowserRight,
  LandingBrowserLeft,
} from "@/components/ui/landing";
import NextImage from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <div className="container mx-auto w-full lg:w-3/4 px-8 lg:px-0 min-h-[700px]">
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
            <button className="h-11 px-5 mt-5 font-semibold rounded-lg border-purple-500 border-[1px] text-purple-500 hover:bg-gray-200  max-w-fit">
              Use now
            </button>
          </Link>
        </div>
      </div>

      <div>
        <div className="hidden lg:block absolute h-full w-[45%] top-[30px] -right-8">
          <NextImage
            src="/assets/views.svg"
            alt="Views of components"
            fill
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className="container mx-auto w-full lg:w-3/4 my-4 px-[50px] lg:px-0 min-h-[800px] flex">
        <LandingBrowserRight />
      </div>
      <div className="container mx-auto w-full lg:w-3/4 my-4 px-[50px] lg:px-0 min-h-[800px] flex">
        <LandingBrowserLeft />
      </div>
      <div className="bg-gray-150 py-12">
        <div className="container mx-auto w-full lg:w-3/4 block lg:px-0">
          <p className="text-xl text-gray-700 text-center">readme.rocks</p>
        </div>
      </div>
    </>
  );
}

export const revalidate = 3604800;
