import { useCallback } from "react";
import { atom } from "recoil";
import { useReducedState } from "../useReducedState";

export type Friend = {
  id: number;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
};

export type Message = {
  id: number;
  message: string;
  timestamp: string;
  sender: number;
  receiver: number;
};

export type ChatState = {
  friends: Friend[];
  openChat: number | null;
  messages: Message[];
};

const chatState = atom<ChatState>({
  key: "chatState",
  default: {
    friends: [],
    messages: [],
    openChat: null,
  },
});

export const useFriends = () => {
  return useReducedState(
    chatState,
    (state) => state.friends,
    (state, friends) => ({ ...state, friends })
  );
};

export const useGetFriends = () => {
  return useFriends()[0];
};

export const useSetFriends = () => {
  return useFriends()[1];
};

export const useOpenChat = () => {
  return useReducedState(
    chatState,
    (state) => state.openChat,
    (state, open) => ({ ...state, openChat: open })
  );
};

export const useGetOpenChat = () => {
  return useOpenChat()[0];
};

export const useSetOpenChat = () => {
  return useOpenChat()[1];
};

export const useChatMessage = () => {
  return useReducedState(
    chatState,
    (state) => state.messages,
    (state, messages) => ({ ...state, messages })
  );
};

export const useGetChatMessage = () => {
  return useChatMessage()[0];
};

export const useSetChatMessage = () => {
  return useChatMessage()[1];
};

export const useClearChatMessage = () => {
  const setter = useSetChatMessage();
  return useCallback(() => setter([]), [setter]);
};

export const useAddOldChatMessages = () => {
  const [messages, setter] = useChatMessage();
  return useCallback(
    (...newMessages: Message[]) => setter([...newMessages, ...messages]),
    [messages, setter]
  );
};

export const useAddNewChatMessage = () => {
  const [messages, setter] = useChatMessage();
  return useCallback(
    (...newMessages: Message[]) => setter([...messages,...newMessages]),
    [messages, setter]
  );
};

export default chatState;
