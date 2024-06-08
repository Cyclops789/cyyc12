import { useEffect } from 'react'
import { useCommandsStore } from "@/stores/commands";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBolt } from '@fortawesome/free-solid-svg-icons';
import { commands, additionalCommands } from '@/helpers/commandsHelper';
import tw from 'twin.macro';

function CommandInput() {
    const { addCommand, setCommandPlaceHolder, commandPlaceHolder, setCommands } = useCommandsStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab' || event.keyCode === 9) {
                event.preventDefault();
                const allCommands = [...commands.map((command) => (command.command)), ...additionalCommands];

                for (let i = 0; i < allCommands.length; i++) {
                    const command = allCommands[i];
                    if(command.substring(0, commandPlaceHolder?.length || 0) === commandPlaceHolder) {
                        setCommandPlaceHolder(command);
                        break;
                    }
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [commandPlaceHolder])

    return (
        <>
            <div css={tw`text-green-400`}>
                <FontAwesomeIcon className={'text-blue-500 w-4'} icon={faCloud} />
                <span css={tw`text-orange-400`}> hamza</span>
                <span css={tw`text-white`}>@</span>debian.cyyc.lol <FontAwesomeIcon className={'text-orange-400 w-4'} icon={faBolt} />
                {' '}<input
                    onKeyUp={event => {
                        if (event.key === 'Enter' && commandPlaceHolder) {
                            switch (commandPlaceHolder) {
                                case 'clear': {
                                    setCommands([]);
                                    setCommandPlaceHolder('');
                                    break;
                                }
                                case 'reload': {
                                    window.location.reload();
                                    break;
                                }
                                default: {
                                    addCommand(commandPlaceHolder);
                                    setCommandPlaceHolder('');
                                }
                            }
                        }
                    }}
                    value={commandPlaceHolder || ''}
                    onChange={(e) => setCommandPlaceHolder(e.target.value)}
                    type="text"
                    name="terminal"
                    id="terminal"
                    css={tw`bg-transparent focus:outline-none focus:ring-0 text-white`}
                />
            </div>
        </>
    )
}

export default CommandInput