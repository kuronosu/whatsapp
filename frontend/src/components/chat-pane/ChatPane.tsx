import ChatPaneHeader from "./ChatPaneHeader";
import ChatPaneForm from "./ChatPaneForm";
import ChatPaneMessages from "./ChatPaneMessages";
import { useGetOpenChat } from "../../store/atoms/chat";

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
      <h1 className="text-2xl font-bold text-zinc-300">No chat selected</h1>
      <p className="text-zinc-300">Select a chat to start messaging</p>
    </div>
  );
}

function ChatPane() {
  const openChat = useGetOpenChat();
  if (!openChat) {
    return <NoChatSelected />;
  }
  return (
    <>
      <ChatPaneHeader />
      <ChatPaneMessages />
      <ChatPaneForm />
    </>
  );
}

export default ChatPane;
