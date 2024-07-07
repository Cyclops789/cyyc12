import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { foldersPlaces } from '@/helpers/foldersHelper';

const PlaceRow = styled.div`
    ${tw`flex space-x-2 cursor-pointer items-center bg-transparent p-1 rounded`}

    &:hover {
        ${tw`bg-red-500/10`}
    }

    & svg {
        ${tw`text-[20px] text-red-900`}
    }

    & div {
        ${tw`text-white`}
    }
`;

function Folder() {

    return (
        <div css={tw`bg-black w-full h-full select-none cursor-default overflow-hidden rounded-b-lg flex`}>
            <div
                css={tw`bg-primary h-full w-[250px] border-r border-r-red-500`}
            >
                <div css={tw`p-2 space-y-2 grid`}>
                    <div css={tw`text-white/50`}>Places</div>
                    {foldersPlaces.map((foldersPlace) => (
                        <PlaceRow>
                            <FontAwesomeIcon
                                icon={foldersPlace.icon}
                            />
                            <div>
                                {foldersPlace.name}
                            </div>
                        </PlaceRow>
                    ))}
                </div>
            </div>

            <div
                css={tw`bg-secondary/70 h-full w-full`}
            >

            </div>
        </div>
    )
}

export default Folder;