import tw from "tailwind-styled-components";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const ContainerCss = styled.ul`
  > * {
    &:first-child {
      margin-top: auto !important;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(82 82 91 / var(--tw-bg-opacity));
  }
  ::-webkit-scrollbar-track {
    background-color: rgb(28 25 23 / var(--tw-bg-opacity));
  }
`;

const Container = tw(ContainerCss)`
  flex
  px-7
  w-full
  flex-col
  bg-zinc-800
  grow
  overflow-y-auto
  divide-slate-200
  text-stone-300
  border-t-2
  border-gray-900
`;

const MessageContainer = tw.div`
  flex mb-3 w-full
`;

const MessageText = tw.span`
  py-3 px-4 max-w-[65%]
`;

const SentContainer = tw<any>(MessageContainer)`justify-end`;

const SentText = tw<any>(MessageText)`
  bg-dark rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white
`;

const ReceivedContainer = tw<any>(MessageContainer)`justify-start`;

const ReceivedText = tw<any>(MessageText)`
  py-3 px-4 bg-green_lite rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black
`;

const Message = ({ from, text }: { from: number; text: string }) => {
  const MsgContainer = from === 1 ? SentContainer : ReceivedContainer;
  const MsgText = from === 1 ? SentText : ReceivedText;
  return (
    <MsgContainer>
      <MsgText>{text}</MsgText>
    </MsgContainer>
  );
};

export default function ChatPaneMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages] = useState([
    { from: 1, text: "Message" },
    { from: 2, text: "Message ".repeat(20) },
  ]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="h-3 w-full">&nbsp;</div>
      {messages.map((message, index) => (
        <Message key={index} from={message.from} text={message.text} />
      ))}
      <div ref={bottomRef} />
    </Container>
  );
}

// document.getElementById("").scrollIntoView
