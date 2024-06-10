import TerminalLabel from "@/components/Terminal/TerminalLabel";
import CommandInput from "@/components/Terminal/CommandInput";
import OutPuts from "@/components/Terminal/OutPut";
import tw from 'twin.macro';

function Terminal() {
    return (
        <TerminalLabel>
            <div css={tw`p-2`}>
                <OutPuts />
                <CommandInput />
            </div>
        </TerminalLabel>
    )
}

export default Terminal;