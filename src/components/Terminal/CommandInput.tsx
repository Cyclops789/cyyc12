import React from 'react'
import { useCommandsStore } from "@/stores/commands";
import { useGeneralStore } from "@/stores/general";

function CommandInput() {
    const { addCommand, setCommandPlaceHolder, commandPlaceHolder, setCommands } = useCommandsStore();
    const { openTerminal } = useGeneralStore();

    return (
        <>
            {openTerminal && (
                <div className="text-green-800">
                    <span className="text-red-800">[</span> hamza
                    <span className="text-red-800">@</span>debian  <span className="text-red-800">]</span> #
                    {' '}<input
                        onKeyUp={event => {
                            if (event.key === 'Enter' && commandPlaceHolder) {

                                switch(commandPlaceHolder) {
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
            )}
        </>
    )
}

export default CommandInput