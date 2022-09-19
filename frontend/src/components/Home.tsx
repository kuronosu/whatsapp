import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatPane from "./chat-pane/ChatPane";
import UsersPane from "./users-pane/UsersPane";
import CenteredContainer from "./CenteredContainer";
import Loading from "./Loading";
import {
  Message,
  useAddNewChatMessage,
  useGetOpenChat,
  useUpdateFriendLastMessage,
} from "../store/atoms/chat";
import useAuth from "../hooks/useAuth";

const Container = tw.div<any>`
  flex
  flex-row
  h-full
  w-full
`;

const ContainerRight = tw.div<any>`
  m-0
  p-0
  flex
  h-full
  w-full
  flex-col
  border-l-2
  border-zinc-700
`;

export default function Home() {
  const openChat = useGetOpenChat();
  const addNewMessage = useAddNewChatMessage();
  const updateFriendLastMessage = useUpdateFriendLastMessage();
  const { token } = useAuth();
  const [socketUrl] = useState(`ws://localhost:8000/messages/?token=${token}`);
  const { readyState, lastJsonMessage } = useWebSocket<Message>(socketUrl);
  const lastMessageRef = useRef(lastJsonMessage);

  useEffect(() => {
    if (
      lastJsonMessage &&
      (openChat === lastJsonMessage.sender ||
        openChat === lastJsonMessage.receiver) &&
      lastMessageRef.current !== lastJsonMessage
    ) {
      addNewMessage(lastJsonMessage);
      updateFriendLastMessage(lastJsonMessage);
      lastMessageRef.current = lastJsonMessage;
    }
  }, [addNewMessage, lastJsonMessage, openChat, updateFriendLastMessage]);

  return (
    <Container>
      {readyState === ReadyState.OPEN && (
        <>
          <div className="w-3/12 h-full">
            <UsersPane />
          </div>
          <div className="w-9/12 h-full">
            <ContainerRight>
              <ChatPane />
            </ContainerRight>
          </div>
        </>
      )}
      {(readyState === ReadyState.CLOSED ||
        readyState === ReadyState.CLOSING ||
        readyState === ReadyState.UNINSTANTIATED) && (
        <CenteredContainer>Error refresh the page</CenteredContainer>
      )}
      {readyState === ReadyState.CONNECTING && <Loading />}
    </Container>
  );
}
