"use client";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useGeneralStore } from '@/stores/general';

function BootUp() {
    const { dummyTerminalText, addTerminalText, terminalTexts, setDesktopStatus, desktopStatus } = useGeneralStore();
    let i = 0;

    const onStart = () => {
        setTimeout(() => {
            const currentDummyText = dummyTerminalText[i];
            addTerminalText(currentDummyText);
            i++;
            if (i < dummyTerminalText.length) {
                onStart()
            } else {
                setDesktopStatus('started');
            }
        }, i % 4 ? 200 : 140);
    }

    useEffect(() => {
        if(desktopStatus === 'starting') onStart();
    }, [desktopStatus]);

    useEffect(() => {
        if(terminalTexts?.length > 0) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [terminalTexts]);
    
    return (
        <>
            {(terminalTexts) && (
                <div>
                    {terminalTexts.map((t, i) => <div key={`${t}-${i}`} className="text-white">{'['} <span className="text-green-600">OK</span>  {']'} <span>{t}</span></div>)}
                </div>
            )}
        </>
    )
}

export default BootUp;