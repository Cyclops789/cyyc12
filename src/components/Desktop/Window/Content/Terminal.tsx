import React from 'react'
import TerminalLabel from "@/components/Terminal/TerminalLabel";
import Tab from "@/components/Terminal/Tab";
import StartButtons from "@/components/Global/StartButtons";
import BootUp from "@/components/Terminal/BootUp";
import CommandInput from "@/components/Terminal/CommandInput";
import OutPuts from "@/components/Terminal/OutPut";
import { useGeneralStore } from '@/stores/general';

function Terminal() {
    return (
        <TerminalLabel className="bg-[rgb(21,29,36)] w-[80vw] h-[80vh] cursor-text overflow-hidden rounded-b-lg">
            <div className="p-2">
                <OutPuts />
                <CommandInput />
            </div>
        </TerminalLabel>
    )
}

export default Terminal;