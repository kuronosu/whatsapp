import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { selectedChatUserState } from "../../store/selectors/chat";

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

export default function ChatPaneHeader() {
  const user = useRecoilValue(selectedChatUserState);
  return (
    <Container>
      <UserIcon>{user?.username[0].toUpperCase()}</UserIcon>
      <UsernameText>{user?.username}</UsernameText>
    </Container>
  );
}
