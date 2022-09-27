import tw from "tailwind-styled-components";

const IdFriends = tw.input`
    my-4
    px-3
    p-3
    text-sm
    rounded-md
    text-white
    bg-zinc-700
    placeholder-neutral-400
    focus:outline-none
    w-[40rem]    
`;

const Send = tw.button`
    rounded-lg
    bg-zinc-800 
    font-bold 
    duration-300 
    text-gray-300
    hover:bg-zinc-700
    hover:text-white
    h-11
    p-2
    ml-4
    mt-4
    
`;

function AddFriends() {
    return (
        <div className="flex rounde">
            <IdFriends placeholder="Enter a username"/> 
            <Send>
                Send friend request 
            </Send>
        </div>
    )
}

export default AddFriends;