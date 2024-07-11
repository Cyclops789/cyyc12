import React, { useEffect, type MutableRefObject } from 'react';
import { useCommandsStore } from '@/stores/commands';
import { getCommandOutputs } from '@/helpers/commandsHelper';
import LineBreak from '@/components/Terminal/LineBreak';
import tw from 'twin.macro';

type Props = { pageRefs: MutableRefObject<HTMLDivElement[]> };

function OutPuts({ pageRefs }: Props) {
    const { commands } = useCommandsStore();

    useEffect(() => {
        if(pageRefs.current) pageRefs.current[pageRefs.current.length-1].scrollIntoView({ behavior: 'smooth' });
    }, [commands]);

    return (
        <div css={tw`text-white`}>
            {commands?.map((command, i) => 
                <React.Fragment key={`${command}-${i}`}>
                    <LineBreak command={command} />  
                    <div
                        ref={(e) => {
                            if(e) pageRefs.current[i] = e;
                        }} 
                        css={tw`mt-2`}
                    >
                        {getCommandOutputs(command)?.map(child => child)}
                    </div>
                </React.Fragment> 
            )}
        </div>
    )
}

export default OutPuts;