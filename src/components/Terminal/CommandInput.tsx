import React from 'react'
import { useCommandsStore } from "@/stores/commands";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBolt } from '@fortawesome/free-solid-svg-icons';

function CommandInput() {
    const { addCommand, setCommandPlaceHolder, commandPlaceHolder, setCommands } = useCommandsStore();

    return (
        <>
            <div className="text-green-400">
                <FontAwesomeIcon className={'text-blue-500 w-4'} icon={faCloud} />
                <span className={'text-orange-400'}> hamza</span>
                <span className={"text-white"}>@</span>debian.cyyc.lol <FontAwesomeIcon className={'text-orange-400 w-4'} icon={faBolt} />
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
                    className="bg-transparent focus:outline-none focus:ring-0 text-white"
                />
            </div>
        </>
    )
}

export default CommandInput