import NextImage from "next/image";

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
        <button className="h-11 px-5 mt-5 font-semibold rounded-lg border-purple-500 border-[1px] text-purple-500 hover:bg-gray-200 dark:hover:bg-gray-800 max-w-fit">
          Open builder
        </button>
      </div>

      <div className="hidden lg:block">
        <NextImage
          className="absolute top-[110px] right-[90px]"
          src="/assets/line1.svg"
          alt=""
          width={400}
          height={400}
        />
        <NextImage
          className="absolute top-[260px] -right-[150px]"
          src="/assets/article1.svg"
          alt=""
          width={500}
          height={400}
        />
        <NextImage
          className="absolute top-[260px] right-[520px]"
          src="/assets/metrics1.svg"
          alt=""
          width={260}
          height={500}
        />
        <NextImage
          className="absolute top-[350px] right-[390px]"
          src="/assets/metrics3.svg"
          alt=""
          width={350}
          height={400}
        />
        <NextImage
          className="absolute top-[480px] right-[420px]"
          src="/assets/progress1.svg"
          alt=""
          width={450}
          height={400}
        />
        <NextImage
          className="absolute top-[660px] right-[180px]"
          src="/assets/metrics2.svg"
          alt=""
          width={210}
          height={400}
        />
        <NextImage
          className="absolute top-[660px] right-[480px]"
          src="/assets/metrics4.svg"
          alt=""
          width={250}
          height={400}
        />
        <NextImage
          className="absolute top-[790px] right-[120px]"
          src="/assets/progress2.svg"
          alt=""
          width={450}
          height={400}
        />
      </div>
    </div>
  );
}
