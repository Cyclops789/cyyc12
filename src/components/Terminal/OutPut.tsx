import { useCommandsStore } from '@/stores/commands';
import { getCommandOutputs } from '@/helpers/commandsHelper';
import LineBreak from '@/components/Terminal/LineBreak';
import tw from 'twin.macro';

function OutPuts() {
    const { commands } = useCommandsStore();
    
    return (
        <div className='text-white'>
            {commands?.map((command, i) => 
                <>
                    <LineBreak key={`${command}-${i}`} command={command} />  
                    <div css={tw`mt-2`}>
                        {getCommandOutputs(command)?.map(child => child)}
                    </div>
                </> 
            )}
        </div>
    )
}

export default OutPuts;