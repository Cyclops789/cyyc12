import tw from "tailwind-styled-components"

const Button = tw.button`
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

    active:shadow-[0px_0px_0]    
    active:translate-y-[-0px]
`;

export default Button;