import React from 'react'
import { useGeneralStore } from '@/stores/general';
import Button from '@/components/Global/Button';

function StartButtons() {
    const { initialAction, setInitialAction } = useGeneralStore();

    return (
        <>
            {!initialAction && (
                <div className='flex justify-center items-center space-x-3'>
                    <Button onClick={() => setInitialAction('terminal')}>
                        Terminal
                    </Button>

                    <Button onClick={() => setInitialAction('desktop')}>
                        Desktop
                    </Button>
                </div>
            )}
        </>
    )
}

export default StartButtons