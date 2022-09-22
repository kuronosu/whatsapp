import tw from "tailwind-styled-components";
import { useGetFriend } from "../../store/atoms/chat";

const Container = tw.div<any>`
h-14
flex
w-full
flex-row
items-center
bg-zinc-900
min-h-[3.5rem]
`;

const UserIcon = tw.button<any>`
  w-9
  h-9
  my-1
  ml-3
  text-center
  rounded-full
  text-black
  font-semibold
  bg-green_lite
`;

const UsernameText = tw.span<any>`
ml-3
text-white
`;

export default function ChatPaneHeader({chatId}: {chatId: number}) {
  const user = useGetFriend(chatId)
  return (
    <Container>
      <UserIcon>{user?.username[0].toUpperCase()}</UserIcon>
      <UsernameText>{user?.username}</UsernameText>
    </Container>
  );
}
