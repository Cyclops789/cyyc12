import React, { useState, useEffect } from 'react'
import tw from 'twin.macro';

type Props = { children: React.ReactNode };

function UserSelectionHandler({ children }: Props) {
    const [mouseSelectionSize, setMouseSelectionSize] = useState<{ width: number, height: number }>();

    const [isUserSelecting, setIsUserSelecting] = useState(false);

    const [mousePos, setMousePos] = useState<{ x: number, y: number }>();
    const [mouseDownPos, setMouseDownPos] = useState<{ x: number, y: number }>();

    const handleMouseDown = (event: MouseEvent) => {
        setIsUserSelecting(true);
        setMouseDownPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = (event: MouseEvent) => {
        setIsUserSelecting(false);
        setMousePos(undefined);
        setMouseDownPos(undefined);
        setMouseSelectionSize(undefined);
        
    };

    const handleMouseMove = (event: MouseEvent) => {
        if(isUserSelecting) {
            setMousePos({ x: event.clientX, y: event.clientY });
        }
    };

    useEffect(() => {
        if(isUserSelecting && mousePos && mouseDownPos){
            let width = 0;
            let height = 0;

            try {
                if(mouseDownPos.x > mousePos.x) {
                    width = mouseDownPos.x - mousePos.x;
                } else if(mouseDownPos.x < mousePos.x) {
                    width = mousePos.x - mouseDownPos.x;
                } else {
                    width = mouseDownPos.x;
                }
    
                if(mouseDownPos.y > mousePos.y) {
                    height = mouseDownPos.y - mousePos.y;
                } else if(mouseDownPos.y < mousePos.y) {
                    height = mousePos.y - mouseDownPos.y;
                } else {
                    height = mouseDownPos.y;
                }
            } finally {
                setMouseSelectionSize({ width, height });   
            }
        }

    }, [isUserSelecting, mousePos, mouseDownPos])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isUserSelecting]);

    return (
        <>
            {isUserSelecting && 
                <div style={{
                        width: mouseSelectionSize?.width,
                        height: mouseSelectionSize?.height,
                        transform: `translate(${mouseDownPos?.x}px, ${mouseDownPos?.y}px)`,
                    }}
                    css={tw`fixed border border-red-700 bg-red-700/70`}
                />
            }
            {children}
        </>
    )
}

export default UserSelectionHandler;