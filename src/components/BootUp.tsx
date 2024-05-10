"use client";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useGeneralStore } from '@/stores/general';

function BootUp() {
    const { dummyTerminalText, setOpenTerminal, addTerminalText, openTerminal, terminalTexts, initialAction } = useGeneralStore();
    const [i, setI] = useState(0);

    const onStart = () => {
        setTimeout(() => {
            const currentDummyText = dummyTerminalText[i];
            addTerminalText(currentDummyText);
            setI(i+1);
            if (i < dummyTerminalText.length) {
                onStart()
            } else {
                setOpenTerminal(true);
            }
        }, i === 4 ? 100 : 70);
    }

    useEffect(() => {
        if(openTerminal) onStart();
    }, [openTerminal]);
    
    return (
        <>
            {(!openTerminal && terminalTexts && initialAction === 'terminal') && (
                <div>
                    {terminalTexts.map((t, i) => <div key={`${t}-${i}`} className="text-white">{'['} <span className="text-green-800">OK</span>  {']'} <span>{t}</span></div>)}
                </div>
            )}
        </>
    )
}

export default BootUp;