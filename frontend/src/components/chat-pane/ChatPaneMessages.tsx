import tw from "tailwind-styled-components";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import {
  Message,
  useAddOldChatMessages,
  useClearChatMessage,
  useGetChatMessage,
  useGetOpenChat,
} from "../../store/atoms/chat";
import useAuth from "../../hooks/useAuth";
import Settings from "../../config";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import { PaginatedRespopnse } from "../../types";

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

const Container = tw(ContainerCss)<any>`
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

const MessageItem = ({
  received,
  text,
}: {
  received: boolean;
  text: string;
}) => {
  const MsgContainer = received ? SentContainer : ReceivedContainer;
  const MsgText = received ? SentText : ReceivedText;
  return (
    <MsgContainer>
      <MsgText>{text}</MsgText>
    </MsgContainer>
  );
};

export default function ChatPaneMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(true);
  const { decodedToken } = useAuth();
  const messages = useGetChatMessage();
  const addMessages = useAddOldChatMessages();
  const clearMessages = useClearChatMessage();
  const openChat = useGetOpenChat();
  const [result, fetchMessages] =
    useFetchWithAuth<PaginatedRespopnse<Message>>();

  useEffect(() => {
    if (openChat) {
      clearMessages();
      fetchMessages(Settings.urls.messages.list(openChat));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChat]);

  useEffect(() => {
    if (!result.loading && result.data?.results) {
      addMessages(...result.data.results.reverse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  function loadMore() {
    if (!result.loading && result.data?.next) {
      fetchMessages(result.data.next);
    }
  }

  useEffect(() => {
    if (shouldScroll.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = (e: any) => {
    const offset = 10;
    shouldScroll.current =
      e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + offset &&
      e.target.scrollHeight - e.target.scrollTop >=
        e.target.clientHeight - offset;
  };

  return (
    <Container onScroll={handleScroll}>
      <div className="h-3 w-full">&nbsp;</div>
      {result.loading && <div>Loading...</div>}
      {!result.loading && result.data?.next && (
        <button onClick={loadMore}>Load more...</button>
      )}
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          received={message.sender === decodedToken?.user_id}
          text={message.message}
        />
      ))}
      <div ref={bottomRef} />
    </Container>
  );
}

// document.getElementById("").scrollIntoView
