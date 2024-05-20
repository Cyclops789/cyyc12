import React from "react";
/* For some reasons custom values w-[10px]... doesnt work / render so we are going to convert some classes to vanilla css */
import { twj } from "tw-to-css";

// Commands that doesnt have any output or uses js actions
export const additionalCommands = ["clear", "reload"]
export const commands: { command: string, outputs: React.ReactNode[] }[] = [
    {
        command: 'help',
        outputs: [
            <div className="flex items-center w-full">
                <div style={twj('text-green-400 w-[114px]')} className="pr-2">
                    <div>help</div>
                    <div>about</div>
                    <div>projects</div>
                    <div>socials</div>
                    <div>github</div>
                    <div>email</div>
                    <div>desktop</div>
                    <div>reload</div>
                    <div>info</div>
                    <br />
                    <div>clear</div>
                    <div>pwd</div>
                    <div>ls</div>
                </div>

                <div>
                    <div> - display this help menu</div>
                    <div> - about me</div>
                    <div> - display my projects</div>
                    <div> - view my socials accounts</div>
                    <div> - link to my github account</div>
                    <div> - send me an email</div>
                    <div> - switch to desktop mode</div>
                    <div> - reload the page</div>
                    <div> - show some informations about this website</div>
                    <br />
                    <div> - clear the terminal outputs</div>
                    <div> - display the current working directory</div>
                    <div> - display the current files and folders in this directory</div>
                </div>
            </div>
        ]
    },
    {
        command: 'about',
        outputs: [
            <pre>My name is Hamza, I'm a 20 year old web developer from Morocco,</pre>,
            <pre>I write code in React.js, Vue.js, Next.js, Laravel, and Tailwind CSS.</pre>,
        ]
    },
    {
        command: 'projects',
        outputs: [
            <div><a target="_blank" href="https://github.com/Cyclops789/walkincity-nextjs">WalkIncity <span style={twj('text-green-500')}>{'>'}</span></a></div>,
            <div><a target="_blank" href="https://github.com/Cyclops789/portfolio">Terminal portfolio <span style={twj('text-green-500')}>{'>'}</span></a></div>,
            <div>GreyWeb game dashboard <span style={twj('text-red-500')}>{'>'}</span></div>,
            <div><a target="_blank" href="https://github.com/Cyclops789/rumble-notifier">Rumble Notifier <span style={twj('text-green-500')}>{'>'}</span></a></div>,
        ]
    },
    {
        command: "socials",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "github",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "email",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "desktop",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "info",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "pwd",
        outputs: [
            <pre></pre>
        ]
    },
    {
        command: "ls",
        outputs: [
            <pre></pre>
        ]
    }
]

export const getCommandOutputs = (commandName: string) => {
    const commandFound = commands.find(c => c.command.toLowerCase() === commandName.toLowerCase());

    return (
        commandFound?.outputs.map((output, i) =>
            <React.Fragment key={`${i}-${commandFound.command}`}>
                {output}
            </React.Fragment>
        ) || [<pre>zsh: command not found: {commandName}</pre>]
    );
}
