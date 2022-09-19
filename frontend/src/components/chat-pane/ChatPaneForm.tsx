import tw from "tailwind-styled-components";
import { MdSend } from "react-icons/md";
import useInput from "../../hooks/useInput";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import Settings from "../../config";
import {
  Message,
  useAddNewChatMessage,
  useGetOpenChat,
} from "../../store/atoms/chat";
import { useEffect } from "react";

const Conatiner = tw.div<any>`
py-1
px-6
text-white
bg-zinc-900
`;

const ChatForm = tw.form<any>`
flex
flex-row
items-center
justify-between
`;

const ChatInput = tw.input`
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
  const text = useInput();
  const [res, sendMessage] = useFetchWithAuth<Message>();
  const openChat = useGetOpenChat();
  const addNewMessage = useAddNewChatMessage();

  console.log(res);
  useEffect(() => {
    if (res.data) {
      res?.data && text.set("");
      addNewMessage(res.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = text.value.trim();
    if (!openChat || !msg) return;
    console.log(Settings.urls.messages.send(openChat));
    sendMessage(Settings.urls.messages.send(openChat), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text.value }),
    });
    // text.set("");
  };

  return (
    <Conatiner>
      <ChatForm onSubmit={onSend}>
        <ChatInput
          placeholder="Escribe un mensaje aquí"
          value={text.value}
          onChange={text.onChange}
        />
        <SendButton type="submit">
          <MdSend color="white" size={20} />
        </SendButton>
      </ChatForm>
    </Conatiner>
  );
}
