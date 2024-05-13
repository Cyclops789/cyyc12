import React from 'react'

type Props = { children: React.ReactNode; className: string; }

function TerminalLabel({ children, className }: Props) {
    return (
        <label htmlFor="terminal">
            <div className={className}>
                {children}
            </div>
        </label>
    )
}

export default TerminalLabel;