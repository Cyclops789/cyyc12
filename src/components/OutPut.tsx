"use client";
import React from 'react';
import { useCommandsStore } from '@/stores/commands';
import { getCommandOutputs } from '@/helpers/commandsHelper';
import LineBreak from '@/components/LineBreak';

function OutPuts() {
    const { commands } = useCommandsStore();

    return (
        <div>
            {commands?.map((cmd, i) => 
                <>
                    <LineBreak key={`${cmd}-${i}`} /> <br /> {getCommandOutputs(cmd)?.map(child => {child})}
                </> 
            )}
        </div>
    )
}

export default OutPuts;