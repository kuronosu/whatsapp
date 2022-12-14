import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import useWebSocket, { ReadyState } from "react-use-websocket";
import UsersPane from "./users-pane/UsersPane";
import Loading from "./Loading";
import {
  Message,
  useAddNewChatMessage,
  useUpdateFriendLastMessage,
} from "../store/atoms/chat";
import useAuth from "../hooks/useAuth";
import { CenteredContainer } from "./utils";
import Settings from "../config";
import { Outlet, useParams } from "react-router-dom";

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
  const addNewMessage = useAddNewChatMessage();
  const updateFriendLastMessage = useUpdateFriendLastMessage();
  const { token } = useAuth();
  const [socketUrl] = useState(Settings.urls.ws.messages(token || ""));
  const { readyState, lastJsonMessage } = useWebSocket<Message>(socketUrl);
  const lastMessageRef = useRef(lastJsonMessage);
  const { chatId } = useParams();

  useEffect(() => {
    if (
      lastJsonMessage &&
      (chatId === lastJsonMessage.sender.toString() ||
        chatId === lastJsonMessage.receiver.toString()) &&
      lastMessageRef.current !== lastJsonMessage
    ) {
      addNewMessage(lastJsonMessage);
      updateFriendLastMessage(lastJsonMessage);
      lastMessageRef.current = lastJsonMessage;
    }
  }, [addNewMessage, lastJsonMessage, chatId, updateFriendLastMessage]);

  return (
    <Container>
      {readyState === ReadyState.OPEN && (
        <>
          <div className="w-3/12 h-full">
            <UsersPane />
          </div>
          <div className="w-9/12 h-full">
            <ContainerRight>
              <Outlet />
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
