import Browser from "@/components/layout/browser";
import { BsEnvelope, BsLightningFill } from "react-icons/bs";

export default function Index() {
  return (
    <>
      <div className=" flex flex-col w-full items-center gap-y-2">
        <div className="flex flex-col items-center justify-evenly bg-square-pattern bg-center h-[550px] w-3/4">
          <Browser>
            <h1 className="text-6xl font-extrabold text-center">
              Rock your readme.md
            </h1>
          </Browser>
        </div>
        <div className="flex flex-col items-center gap-y-8 w-3/4 mt-6">
          <p className="w-[800px] text-2xl text-center text-zinc-500 tracking-wider font-light">
            Have a better Readme.md for your Github profile,or repositories.
            Manifest your work with integrating data from{" "}
            <span className="font-bold text-indigo-600">6+</span> platforms.
          </p>
          <div className="w-[600px] flex flex-row relative h-10 rounded-full bg-neutral-200 bg-opacity-60 shadow-md">
            <input
              type="text"
              placeholder="join our waitlist"
              className="pl-8 w-72 bg-transparent justify-start text-[16px] font-light"
            />
            <button className="flex absolute -right-1 -top-2 bg-indigo-600 w-14 h-14 p-2 items-center justify-center rounded-full opacity-100">
              <BsEnvelope size={12} className="h-8 w-8 text-stone-100" />
            </button>
          </div>
        </div>
        <div className="text-indigo-600 uppercase font-bold flex items-center italic text-sm mt-2">
          <BsLightningFill />
          <p className="ml-1">coming march 2025</p>
        </div>
      </div>
    </>
  );
}
