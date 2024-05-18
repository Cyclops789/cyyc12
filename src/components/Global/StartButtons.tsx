import React from 'react'
import { useGeneralStore } from '@/stores/general';
import Button from '@/components/Global/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function StartButtons() {
    const { desktopStatus, setDesktopStatus } = useGeneralStore();

    return (
        <>
            {desktopStatus === 'stopped' && (
                <div className='flex justify-center items-center space-x-3'>
                    <Button className='rounded-lg w-[100px] h-[50px]' onClick={() => setDesktopStatus('starting')}>
                        <FontAwesomeIcon icon={faPowerOff} />
                    </Button>
                </div>
            )}
        </>
    )
}

export default StartButtons