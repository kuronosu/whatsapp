import tw from "tailwind-styled-components";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatPaneForm from "./ChatPaneForm";
import ChatPaneMessages from "./ChatPaneMessages";

const Container = tw.div<any>`
  m-0
  p-0
  flex
  h-full
  flex-col
  border-l-2
  border-zinc-700
`;

function ChatPane() {
  return (
    <Container>
      <ChatPaneHeader />
      <ChatPaneMessages />
      <ChatPaneForm />
    </Container>
  );
}

export default ChatPane;
