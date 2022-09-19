import tw from "tailwind-styled-components";
import ChatPane from "./chat-pane/ChatPane";
import UsersPane from "./users-pane/UsersPane";
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Container = tw.div<any>`
  flex
  flex-row
  h-full
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
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/messages/');
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  console.log(connectionStatus);

  return (
    <Container>
      <div className="w-3/12 h-full">
        <UsersPane />
      </div>
      <div className="w-9/12 h-full">
        <ContainerRight>
          <ChatPane />
        </ContainerRight>
      </div>
    </Container>
  );
}
