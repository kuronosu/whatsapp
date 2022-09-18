import tw from "tailwind-styled-components";
import { MdSend } from "react-icons/md";

const Conatiner = tw.div<any>`
py-1
px-6
text-white
bg-zinc-900
`;

const ChatInputContainer = tw.form<any>`
flex
flex-row
items-center
justify-between
`;

const ChatInput = tw.input<any>`
grow
mr-6
my-1
px-3
py-2
text-sm
rounded-md
text-white
bg-zinc-800
placeholder-neutral-400
focus:outline-none
`;

const SendButton = tw.button<any>`
p-1
w-9
h-9
flex
rounded-full
duration-300
bg-opacity-50
bg-zinc-900
items-center
justify-center
hover:backdrop-brightness-150
hover:bg-zinc-800
`;

export default function ChatPaneForm() {
  return (
    <Conatiner>
      <ChatInputContainer>
        <ChatInput placeholder="Escribe un mensaje aquí"></ChatInput>
        <SendButton type="submit">
          <MdSend color="white" size={20} />
        </SendButton>
      </ChatInputContainer>
    </Conatiner>
  );
}
