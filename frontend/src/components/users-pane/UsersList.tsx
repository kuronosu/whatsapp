import tw from "tailwind-styled-components";
import styled from "styled-components";
import { UserItem } from "./UserItem";
import { useGetFriends, useOpenChat } from "../../store/atoms/chat";

const CustomScrollbar = styled.ul`
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(82 82 91 / var(--tw-bg-opacity));
    max-height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgb(28 25 23 / var(--tw-bg-opacity));
    max-height: 8px;
  }
`;

const Container = tw(CustomScrollbar)`
  grow
  divide-y
  border-t-2
  overflow-y-scroll
  bg-stone-900
  border-gray-900
  divide-slate-200
  text-stone-300
`;

function UsersList() {
  const friends = useGetFriends();
  const [openChat, setOpenChat] = useOpenChat();
  return (
    <Container>
      {friends.map((it) => (
        <UserItem
          key={it.id}
          username={it.username}
          active={it.id === openChat}
          lastMessage={it.lastMessage}
          onClick={() => setOpenChat(it.id)}
          lastMessageTime={it.lastMessageTime}
        />
      ))}
    </Container>
  );
}

export default UsersList;
