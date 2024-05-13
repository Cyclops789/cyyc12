import React from 'react'

function Tab() {
    return (
        <div className="flex justify-between">
            <div className="bg-green-800 w-full h-[30px] flex justify-center items-center">
                <span>~ : zsh - Terminal</span>
            </div>
            <div className="bg-red-800 w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                <span>X</span>
            </div>
        </div>
    )
}

export default Tab