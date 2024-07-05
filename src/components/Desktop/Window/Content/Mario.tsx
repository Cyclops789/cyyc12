import React from 'react'
import tw from 'twin.macro';

function Mario() {
    // https://github.com/SevenworksDev/SM64-JS/blob/main/game/sm64.js
    return (
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden rounded-b-lg`}>
            <iframe
                src={'https://sevenworksdev.github.io/SM64-JS/start.html'}
                css={tw`w-full h-full`}
                sandbox={"allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"}
            />
        </div>
    )
}

export default Mario;