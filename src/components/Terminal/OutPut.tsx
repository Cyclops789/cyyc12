import React from 'react';
import { useCommandsStore } from '@/stores/commands';
import { getCommandOutputs } from '@/helpers/commandsHelper';
import LineBreak from '@/components/Terminal/LineBreak';
import tw from 'twin.macro';

function OutPuts() {
    const { commands } = useCommandsStore();
    
    return (
        <div css={tw`text-white`}>
            {commands?.map((command, i) => 
                <React.Fragment key={`${command}-${i}`}>
                    <LineBreak command={command} />  
                    <div css={tw`mt-2`}>
                        {getCommandOutputs(command)?.map(child => child)}
                    </div>
                </React.Fragment> 
            )}
        </div>
    )
}

export default OutPuts;