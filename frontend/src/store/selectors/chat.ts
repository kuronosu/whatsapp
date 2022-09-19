import { selector } from "recoil";
import chatState from "../atoms/chat";

export const selectedChatUserState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const chat = get(chatState);
    return chat.friends.find((friend) => friend.id === chat.openChat);
  },
});
