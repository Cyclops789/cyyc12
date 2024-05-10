import React, { ReactElement } from "react"

const commands: { command: string, outputs: React.ReactNode[]}[] = [
    {
        command: 'help',
        outputs: [
            <pre>Hello</pre>,
            <pre>Hello</pre>
        ]
    },
]

export const getCommandOutputs = (commandName: string) => {
    const commandFound = commands.find(c => c.command.toLowerCase() === commandName.toLowerCase());

    return (commandFound?.outputs || null);
}