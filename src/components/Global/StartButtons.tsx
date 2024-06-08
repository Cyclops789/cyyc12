import { useGeneralStore } from '@/stores/general';
import Button from '@/components/Global/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import tw from 'twin.macro';

function StartButtons() {
    const { desktopStatus, setDesktopStatus } = useGeneralStore();

    return (
        desktopStatus === 'stopped' && (
            <div css={tw`flex justify-center items-center space-x-3`}>
                <Button onClick={() => setDesktopStatus('starting')}>
                    <div css={tw`flex justify-center items-center`}>
                        <FontAwesomeIcon className={'w-[20px]'} icon={faPowerOff} />
                    </div>
                </Button>
            </div>
        )
    )
}

export default StartButtons;