import TerminalLabel from "@/components/Terminal/TerminalLabel";
import CommandInput from "@/components/Terminal/CommandInput";
import OutPuts from "@/components/Terminal/OutPut";
import tw from 'twin.macro';
import { useRef } from "react";

function Terminal() {
    const pageRefs = useRef<HTMLDivElement[]>([]);

    return (
        <TerminalLabel>
            <div css={tw`p-2`}>
                <OutPuts {...{ pageRefs }} />
                <CommandInput />
            </div>
        </TerminalLabel>
    )
}

export default Terminal;