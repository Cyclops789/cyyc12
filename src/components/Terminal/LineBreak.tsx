import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBolt } from '@fortawesome/free-solid-svg-icons';

type Props = { command: string };

function LineBreak({ command }: Props) {
    return (
        <div className="text-green-400">
            <FontAwesomeIcon className={'text-blue-500 w-4'} icon={faCloud} />
            <span className={'text-orange-400'}> hamza</span>
            <span className={"text-white"}>@</span>debian.cyyc.lol <FontAwesomeIcon className={'text-orange-400 w-4'} icon={faBolt} />
            {' '}<span className={'text-white'}>{command}</span>
        </div>
    )
}

export default LineBreak