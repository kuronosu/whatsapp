import { atom } from "recoil";
import { useReducedState } from "../useReducedState";

export type Friend = {
  id: number;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
};

export type ChatState = {
  friends: Friend[];
  openChat: number | null;
};

const chatState = atom<ChatState>({
  key: "chatState",
  default: {
    friends: [],
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

export default chatState;
