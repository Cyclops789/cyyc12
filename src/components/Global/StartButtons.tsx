import { useGeneralStore } from '@/stores/general';
import Button from '@/components/Global/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import tw from 'twin.macro';

function StartButtons() {
    const { setDesktopStatus } = useGeneralStore();

    return (
        <div css={tw`flex justify-center items-center space-x-3`}>
            <Button onClick={() => setDesktopStatus('starting')}>
                <div css={tw`flex justify-center items-center`}>
                    <FontAwesomeIcon css={tw`w-[20px]`} icon={faPowerOff} />
                </div>
            </Button>

            <Button 
                onClick={() => window.location.assign('https://cyyc.lol')}
                css={tw`bg-red-600 border-red-600 shadow-red-700`}
            >
                <div css={tw`flex justify-center items-center`}>
                    <FontAwesomeIcon css={tw`w-[20px]`} icon={faMobileAlt} />
                </div>
            </Button>
        </div>
    )
}

export default StartButtons;