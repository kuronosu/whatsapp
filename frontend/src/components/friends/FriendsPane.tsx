import tw from "tailwind-styled-components";
import AddFriends from "./AddFriends";
import Pending from "./Pending";

const ContainerFriends = tw.div<any>`
    flex
    divide-x-2
    bg-zinc-900
    h-full
`;
const AddBtt = tw.button<any>`
    rounded-lg 
    bg-zinc-800
    font-bold 
    duration-300 
    text-gray-300
    hover:bg-zinc-700
    hover:text-white
    h-8
    mt-2
    px-2
`;

const PendingBtt = tw.button<any>`
    rounded-lg 
    bg-zinc-800
    font-bold 
    duration-300 
    text-gray-300
    hover:bg-zinc-700
    hover:text-white
    h-8
    mt-2
    ml-2
    px-2
    
`;

function FriendsPane() {
    return (
        <ContainerFriends>
            <div className="pl-4 pt-4 flex-col divide-y-2 w-full ">
                <div className="flex">
                    <p className="text-white text-xl p-2">Friends</p>
                    <AddBtt>Add Friend</AddBtt>
                    <PendingBtt>Pending</PendingBtt>
                </div>
                {/* <AddFriends/>    */}
                <Pending/>
            </div>
        </ContainerFriends>
    )
}

export default FriendsPane;