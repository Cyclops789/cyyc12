"use client";
import TerminalLabel from "@/components/TerminalLabel";
import Tab from "@/components/Tab";
import StartButtons from "@/components/StartButtons";
import BootUp from "@/components/BootUp";
import CommandInput from "@/components/CommandInput";
import OutPuts from "@/components/OutPut";

export default function Home() {

  return (
    <TerminalLabel className="flex justify-center items-center bg-black w-screen h-screen cursor-text">
      <div className="border-2 border-green-800 w-[90%] h-[90%] overflow-auto">
        <Tab />
        <div className="ml-2 mt-2">
          <StartButtons />
          <BootUp />
          <OutPuts />
          <CommandInput />
        </div>
      </div>
    </TerminalLabel>
  );
}
