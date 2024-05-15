import React, { ReactNode } from "react";
import {
  BsBoxArrowUp,
  BsChevronRight,
  BsChevronLeft,
  BsPlusLg,
  BsArrowClockwise,
} from "react-icons/bs";

type BrowserProps = {
  children: ReactNode;
};

export default function Browser({ children }: BrowserProps) {
  return (
    <>
      <div className="w-[650px] h-[420px] bg-neutral-50 rounded-3xl shadow-xl border flex flex-col">
        <div className="flex items-center justify-center gap-2 h-16 border-b rounded-t-3xl px-5">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-400 rounded-full" />
            <div className="w-4 h-4 bg-orange-300 rounded-full" />
            <div className="w-4 h-4 bg-green-400 rounded-full" />
          </div>
          <div className="flex items-center w-5/6 gap-3 text-gray-600">
            <div className="flex">
              <BsChevronLeft />
              <BsChevronRight />
            </div>
            <div className="flex justify-center items-center relative h-9 w-full bg-neutral-200 opacity-60 text-black rounded-xl px-2">
              <p className="flex text-center ">readme.rocks</p>
              <BsArrowClockwise
                size={16}
                className="absolute right-2 top-auto"
              />
            </div>
            <BsBoxArrowUp size={18} />
            <BsPlusLg size={20} />
          </div>
        </div>
        <div className="py-4 px-10 flex-grow gap-y-4 flex flex-col">
          <div className="w-[520px] h-32 bg-neutral-200 opacity-60 rounded-2xl "></div>
          <div className="flex gap-x-5">
            <div className="w-[120px] h-36 bg-neutral-200 opacity-60 rounded-2xl"></div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
