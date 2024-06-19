import React from "react";
import tw, { styled } from "twin.macro";

const HelpContainer = styled.div`
    ${tw`flex items-center w-full`}

    & .help-menu{
        ${tw`text-green-400 w-[114px] pr-2`}
    }
`;

const GreenSpan = tw.span`text-green-500`;
const RedSpan = tw.span`text-red-500`;

// Commands that doesnt have any output or uses js actions
export const additionalCommands = ["clear", "reload"]
export const commands: { command: string, outputs: React.ReactNode[] }[] = [
    {
        command: 'help',
        outputs: [
            <HelpContainer>
                <div className={"help-menu"}>
                    <div>help</div>
                    <div>about</div>
                    <div>projects</div>
                    <div>socials</div>
                    <div>github</div>
                    <div>email</div>
                    <div>desktop</div>
                    <div>reload</div>
                    <div>info</div>
                    <div>fastfetch</div>
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
                    <div> - display my system information</div>
                    <br />
                    <div> - clear the terminal outputs</div>
                    <div> - display the current working directory</div>
                    <div> - display the current files and folders in this directory</div>
                </div>
            </HelpContainer>
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
            <div><a target="_blank" href="https://github.com/Cyclops789/walkincity-nextjs">WalkIncity <GreenSpan>{'>'}</GreenSpan></a></div>,
            <div><a target="_blank" href="https://github.com/Cyclops789/cyyc12">Cyyc12 <GreenSpan>{'>'}</GreenSpan></a></div>,
            <div>GreyWeb <RedSpan>{'>'}</RedSpan></div>,
            <div><a target="_blank" href="https://github.com/Cyclops789/rumble-notifier">Rumble Notifier <GreenSpan>{'>'}</GreenSpan></a></div>,
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
    },
    {
        command: "fastfetch",
        outputs: [
            <div style={{ display: 'flex', lineHeight: '21px' }}>
                <div style={{ whiteSpace: 'pre-wrap', marginRight: '20px' }}>
                    <div>{'        '}_,met$$$$$gg.</div>
                    <div>{'      '},g$$$$$$$$$$$$$$$P.</div>
                    <div>{'   '},g$$P"{'         '}"""Y$$.".</div>
                    <div>{'  '},$$P'{'               '}`$$$.</div>
                    <div>{''}',$$P{'       '},ggs.{'      '}`$$b:</div>
                    <div>{''}`d$$'{'     '},$P"'{'   '}<GreenSpan>.</GreenSpan>{'     '}$$$</div>
                    <div>{' '}$$P{'      '}d$'{'     '}<GreenSpan>,</GreenSpan>{'     '}$$$P</div>
                    <div>{' '}$$:{'      '}$.{'   '}<GreenSpan>-</GreenSpan>{'    '},d$$'</div>
                    <div>{' '}$$;{'      '}Y$b._{'   '}_,d$P'</div>
                    <div>{' '}Y$$.{'    '}<GreenSpan>`.</GreenSpan>`"Y$$$$P"'</div>
                    <div>{' '}`$$b{'      '}<GreenSpan>"-.__</GreenSpan></div>
                    <div>{'  '}`Y$$</div>
                    <div>{'   '}`Y$$.</div>
                    <div>{'     '}`$$b.</div>
                    <div>{'       '}`Y$$b.</div>
                    <div>{'          '}`"Y$b._</div>
                    <div>{'             '}`"""</div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <br />
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div><GreenSpan>hamza</GreenSpan>@<GreenSpan>debian</GreenSpan></div>
                    <div>------------</div>
                    <div><GreenSpan>OS</GreenSpan>: Debian GNU/Linux bookworm 12.5 x86_64</div>
                    <div><GreenSpan>Host</GreenSpan>: Aspire E5-574G (V1.10)</div>
                    <div><GreenSpan>Kernel</GreenSpan>: 6.1.0-20-rt-amd64</div>
                    <div><GreenSpan>Uptime</GreenSpan>: 16 hours, 43 mins</div>
                    <div><GreenSpan>Packages</GreenSpan>: 3777 (dpkg), 6 (snap)</div>
                    <div><GreenSpan>Shell</GreenSpan>: zsh 5.9</div>
                    <div><GreenSpan>Display (CMN15C6)</GreenSpan>: 1366x768 @ 60Hz [Built-in]</div>
                    <div><GreenSpan>DE</GreenSpan>: KDE Plasma 5.27.5</div>
                    <div><GreenSpan>WM</GreenSpan>: KWin (Wayland)</div>
                    <div><GreenSpan>WM Theme</GreenSpan>: Breeze</div>
                    <div><GreenSpan>Theme</GreenSpan>: Breeze (Dark) [QT], Breeze [GTK2/3]</div>
                    <div><GreenSpan>Icons</GreenSpan>: BeautySolar [QT], BeautySolar [GTK2/3/4]</div>
                    <div><GreenSpan>Font</GreenSpan>: Noto Sans (10pt) [QT], Noto Sans (10pt) [GTK2/3/4]</div>
                    <div><GreenSpan>Cursor</GreenSpan>: breeze (24px)</div>
                    <div><GreenSpan>Terminal</GreenSpan>: konsole 22.12.3</div>

                    <div><GreenSpan>CPU</GreenSpan>: Intel(R) Core(TM) i5-6200U (4) @ 2.80 GHz</div>
                    <div><GreenSpan>GPU</GreenSpan>: Intel HD Graphics 520 @ 1.00 GHz [Integrated]</div>
                    <div><GreenSpan>Memory</GreenSpan>: 3.87 GiB / 7.62 GiB (51%)</div>
                    <div><GreenSpan>Swap</GreenSpan>: 0 B / 5.95 GiB (0%)</div>
                    <div><GreenSpan>Disk (/)</GreenSpan>: 108.63 GiB / 115.38 GiB (94%) - ext4</div>
                    <div><GreenSpan>Disk (/media/HDD)</GreenSpan>: 310.89 GiB / 931.51 GiB (33%) - fuseblk</div>
                    <div><GreenSpan>Local IP (wlp3s0)</GreenSpan>: 192.168.0.2/24 *</div>
                    <div><GreenSpan>Locale</GreenSpan>: en_US.UTF-8</div>
                    
                    <br />
                    
                    <div style={{ letterSpacing: '-0.5px', display: 'flex', height: '20px' }}>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,0,0)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,0,0)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,255,0)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,165,0)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,0,255)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(128,0,128)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(60,179,113)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,255,255)'}}></div>
                    </div>
                    <div style={{ letterSpacing: '-0.5px', marginTop: '-2px', display: 'flex', height: '20px' }}>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,0,0, 0.1)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,0,0,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,255,0,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,165,0,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(0,0,255,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(128,0,128,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(60,179,113,0.8)'}}></div>
                        <div style={{ width: '30px', backgroundColor: 'rgb(255,255,255,0.8)'}}></div>
                    </div>
                </div>
            </div>
        ]
    },
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
