import { availableCategories } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import tw, { styled } from 'twin.macro';

const CategoryContainer = styled.div`
    ${tw`text-red-600 h-[40px] mb-2 flex items-center border border-transparent rounded cursor-pointer`}

    &:hover {
        ${tw`border-red-600 bg-red-600/20`}
    }
`;

function Categories() {
    return (
        <div css={tw`w-[40%] p-2`}>
            {availableCategories.map(category => (
                <CategoryContainer>
                    <div css={tw`w-[35px] mx-1`}>
                        <FontAwesomeIcon css={tw`text-[23px]`} icon={category.icon} /> 
                    </div>
                    
                    <div css={tw`text-white capitalize`}>
                        {category.name}
                    </div>
                </CategoryContainer>
            ))}
        </div>
    )
}

export default Categories;