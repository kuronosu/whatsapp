import tw from "tailwind-styled-components";
import FriendsContainer from "./FriendsContainer";

import useInput from "../../hooks/useInput";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import Settings from "../../config";
import { useEffect, useRef, useState } from "react";

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

function AddFriend() {
  const [status, setStatus] = useState("");
  const friendName = useInput();
  const lastRef = useRef<Response | null>(null);
  const [res, sendFriendRequest, resRef] = useFetchWithAuth<{
    message: string;
  }>();

  useEffect(() => {
    if (resRef?.status === 404) {
      setStatus("User not found");
    } else if (resRef !== lastRef.current && res.data) {
      setStatus(res.data.message);
    }
  }, [res, resRef]);

  useEffect(() => {
    if (resRef?.status === 200) friendName.set("");
    lastRef.current = resRef;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resRef]);

  return (
    <FriendsContainer>
      <div>
        <div className="flex rounde">
          <IdFriends
            placeholder="Enter a username"
            value={friendName.value}
            onChange={(e) => {
              setStatus("");
              friendName.onChange(e);
            }}
          />
          <Send
            disabled={res.loading}
            onClick={(e) => {
              e.preventDefault();
              setStatus("");
              if (friendName.value.trim() === "") {
                alert("Please enter a username");
              }
              sendFriendRequest(Settings.urls.auth.sendFriendRequest, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: friendName.value }),
              });
            }}
          >
            Send friend request
          </Send>
        </div>
        <span className="text-white">{status}</span>
      </div>
    </FriendsContainer>
  );
}

export default AddFriend;
