import React from 'react'
import TerminalLabel from "@/components/Terminal/TerminalLabel";
import CommandInput from "@/components/Terminal/CommandInput";
import OutPuts from "@/components/Terminal/OutPut";
import WindowLayout from '@/components/Layouts/WindowLayout';

function Terminal() {
    return (
        <WindowLayout>
            <TerminalLabel className="bg-[rgb(21,29,36)] w-full h-full cursor-text overflow-hidden rounded-b-lg">
                <div className="p-2">
                    <OutPuts />
                    <CommandInput />
                </div>
            </TerminalLabel>
        </WindowLayout>
    )
}

export default Terminal;