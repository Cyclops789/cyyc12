"use client";
import React, { useEffect } from 'react';
import { useCommandsStore } from '@/stores/commands';
import { getCommandOutputs } from '@/helpers/commandsHelper';
import LineBreak from '@/components/Terminal/LineBreak';

function OutPuts() {
    const { commands } = useCommandsStore();
    
    return (
        <div className='text-green-800'>
            {commands?.map((command, i) => 
                <>
                    <LineBreak key={`${command}-${i}`} command={command} />  {getCommandOutputs(command)?.map(child => child)}
                </> 
            )}
        </div>
    )
}

export default OutPuts;