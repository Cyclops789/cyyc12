import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBolt } from '@fortawesome/free-solid-svg-icons';
import tw from 'twin.macro';

type Props = { command: string };

function LineBreak({ command }: Props) {
    return (
        <div css={tw`text-green-400`}>
            <FontAwesomeIcon css={tw`text-blue-500 w-4`} icon={faCloud} />
            <span css={tw`text-base-500`}> hamza</span>
            <span css={tw`text-white`}>@</span>debian <FontAwesomeIcon css={tw`text-base-500 w-4`} icon={faBolt} />
            {' '}<span css={tw`text-white`}>{command}</span>
        </div>
    )
}

export default LineBreak