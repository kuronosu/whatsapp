import ChatPaneHeader from "./ChatPaneHeader";
import ChatPaneForm from "./ChatPaneForm";
import ChatPaneMessages from "./ChatPaneMessages";
import { useParams } from "react-router-dom";
import { useGetFriends } from "../../store/atoms/chat";
import EmptyContainer from "../EmptyContainer";

function ChatPane() {
  const { chatId } = useParams();
  const friends = useGetFriends();
  if (!chatId || friends.some((friend) => friend.id.toString() !== chatId)) {
    return <EmptyContainer title="Chat not found" subtitle="" />;
  }
  return (
    <>
      <ChatPaneHeader chatId={parseInt(chatId)} />
      <ChatPaneMessages chatId={parseInt(chatId)} />
      <ChatPaneForm chatId={parseInt(chatId)} />
    </>
  );
}

export default ChatPane;
