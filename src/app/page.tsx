"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState<string[]>();
  const [clicked, setClicked] = useState(false);
  const [openShell, setOpenSheel] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  let i = 0;

  const dummyTerminalText = [
    "Found device VMware Virtual_S 2.",
    "Activating swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Found device VMware_Virtual_S 1.",
    "Mounting boot...",
    "Activated swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Reached target Swaps.",
    "Mounting Temporary Directory /tmp...",
    "Mounted Temporary Directory /tmp.",
    "Mounted /boot.",
    "Reached target Local File Systems.",
    "Starting Automatic Boot Loader Update...",
    "Starting Create Volatile Files and Directories...",
    "Finished Automatic Boot Loader Update.",
    "Finished Create Volatile Files and Directories. Starting Record System Boot/Shutdown in UTMP... Finished Record System Boot/Shutdown in UTMP.",
    "Reached target System Initialization.",
    "Started Daily verification of password and group files. Started Daily Cleanup of Temporary Directories.",
    "Reached target Timer Units.",
    "Listening on D-Bus System Message Bus Socket.",
    "Reached target Socket Units.",
    "Reached target Basic System.",
    "Started D-Bus System Message Bus.",
    "Starting Network Manager...",
    "Starting User Login Management...",
    "Started Verify integrity of password and group files.",
    "Started User Login Management.",
    "Started Network Manager.",
    "Reached target Network.",
    "Starting Permit User Sessions...",
    "Finished Permit User Sessions.",
    "Started Getty on tty1.",
    "Reached target Login Prompts.",
    "Reached target Multi-User System.",
    "Reached target Graphical Interface.",
    "Starting Hostname Service...",
    "Started Hostname Service.",
    "Listening on Load/Save RF Kill Switch Status /dev/rfkill Watch. Starting Network Manager Script Dispatcher Service...",
    "Started Network Manager Script Dispatcher Service.",
  ]

  const onStart = () => {
    setClicked(true);

    setTimeout(() => {
      const e = dummyTerminalText[i];
      setText((t) => {
        if (t) {
          return [...t, e]
        } else {
          return [e]
        }
      })
      i++;
      if (i < dummyTerminalText.length) {
        onStart()
      } else {
        setOpenSheel(true)
      }
    }, 70)
  }

  const handleChangeAndSize = (ev: any) => {
    const target = ev.target;
    target.style.width = '10px';
    target.style.width = `${target.scrollWidth}px`;

    setCommand(ev.target.value)
  }

  const onSendCommand = () => {
    switch (command) {
      case "help": {
        setOutput('Commands')
        break;
      }
    }
  }

  return (
    <label htmlFor="shell">
      <main className="flex justify-center items-center bg-black w-screen h-screen cursor-text">
        <div className="border-2 border-green-800 w-[90%] h-[90%] overflow-auto">
          <div className="flex justify-between">
          <div className="bg-green-800 w-full h-[30px] flex justify-center items-center">
            <span>~ : zsh - Knosole</span>
          </div>
          <div className="bg-red-800 w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
            <span>X</span>
          </div>
          </div>
          <div className="ml-2 mt-2">
            {!clicked && (
              <button onClick={onStart} className="bg-green-800 text-black hover:text-white active:text-white">
                <div className="px-2 py-1 text-xl">
                  Start
                </div>
              </button>
            )}
            {(!openShell && text) && (
              <div>
                {text.map((t) => <div className="text-white">{'['} <span className="text-green-800">OK</span>  {']'} <span>{t}</span></div>)}
              </div>
            )}
            {openShell && (
              <div className="text-green-800">
                <span className="text-red-800">[</span> hamza
                <span className="text-red-800">@</span>debian  <span className="text-red-800">]</span> #
                {' '}<input
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      onSendCommand()
                    }
                  }}
                  onChange={handleChangeAndSize}
                  type="text"
                  name="shell"
                  id="shell"
                  className="bg-transparent focus:outline-none focus:ring-0"
                />
              </div>
            )}

          </div>
        </div>
        <div className="bg-green-800 h-[90%] w-[5%]">
            <div>Test 1</div>
            <div>Test 2</div>
            <div>Test 3</div>
            <div></div>
        </div>
      </main>
    </label>

  );
}
