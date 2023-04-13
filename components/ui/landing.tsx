"use client";
import NextImage from "next/image";
import { useState } from "react";
import { cn } from "@/utils";

export const LandingBrowserRight = () => {
  return (
    <>
      <div className="pt-20 w-full">
        <h2 className="text-4xl font-bold">Components</h2>
        <p className="text-2xl my-5">
          Get your statistics from various platforms.
          <br />
          Currently supported platforms:
        </p>
        <ul className="text-2xl list-disc list-inside">
          <li>Github</li>
          <li>Wakatime</li>
          <li>Codewars</li>
          <li>StackOverflow</li>
        </ul>
      </div>
      <div className="w-full">
        <NextImage
          src="/assets/browser_right.svg"
          alt="Views of components"
          width={800}
          height={800}
          style={{
            position: "absolute",
            right: "0",
          }}
        />
      </div>
    </>
  );
};

export const LandingBrowserLeft = () => {
  const [darkMode, setDarkMode] = useState(false);

  const onClick = () => setDarkMode(!darkMode);
  return (
    <>
      <div
        className={cn("w-full")}
        style={{ colorScheme: darkMode ? "dark" : "light" }}
      >
        <NextImage
          src="/assets/browser_left.svg"
          alt="Views of components"
          width={800}
          height={800}
          style={{
            position: "absolute",
            left: "0",
          }}
        />
      </div>
      <div className="pt-20 w-full">
        <h2 className="text-4xl font-bold">Light and dark mode</h2>
        <p className="text-2xl my-5">
          Get your statistics from various platforms.
          <br />
          Currently supported platforms:
        </p>
        <button
          onClick={onClick}
          className="border-[1px] py-3 px-7 border-gray-400 rounded-md"
        >
          Enable Dark Mode
        </button>
      </div>
    </>
  );
};
