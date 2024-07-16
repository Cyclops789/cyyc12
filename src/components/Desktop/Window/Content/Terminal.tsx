import TerminalLabel from "@/components/Global/Terminal/TerminalLabel";
import CommandInput from "@/components/Global/Terminal/CommandInput";
import OutPuts from "@/components/Global/Terminal/OutPut";
import { useRef } from "react";

function Terminal() {
    const pageRefs = useRef<HTMLDivElement[]>([]);

    return (
        <TerminalLabel>
            <OutPuts {...{ pageRefs }} />
            <CommandInput />
        </TerminalLabel>
    )
}

export default Terminal;