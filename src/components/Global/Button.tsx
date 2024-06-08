import tw, { styled } from "twin.macro"

const Button = styled.button`
    ${tw`
        relative
        bg-green-600 
        border-green-600 
        text-black
        rounded-lg 
        w-[100px]
        h-[50px]
        transition-all
        duration-100
        
        shadow-green-700
        shadow-[0px_6px_0]    
        translate-y-[-6px]
    `}

    &:active {
        box-shadow: 0px 0px 0;
        transform: translateY(0px); // Since -0px is equivalent to 0px, we can use 0px directly
    }
`;

export default Button;