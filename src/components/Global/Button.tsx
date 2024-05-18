import React from 'react';

type Props = { children: React.ReactNode; onClick: () => void, className?: string; }

function Button({ children, onClick, className }: Props) {
    return (
        <button 
            onClick={onClick} 
            className={`bg-green-600 hover:bg-green-500 text-black active:text-white ${className || ''}`}
        >
            <div className="px-2 py-1 text-xl">
                {children}
            </div>
        </button>
    )
}

export default Button;