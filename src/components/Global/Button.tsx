import React from 'react';

type Props = { children: React.ReactNode; onClick: () => void, className?: string; }

function Button({ children, onClick, className }: Props) {
    return (
        <button 
            onClick={onClick} 
            className={`bg-green-800 text-black hover:text-white active:text-white ${className || ''}`}
        >
            <div className="px-2 py-1 text-xl">
                {children}
            </div>
        </button>
    )
}

export default Button;