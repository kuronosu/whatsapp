import { atom } from "recoil";

const chatState = atom({
  key: "authState",
  default: {
    token: {
      access: null,
      refresh: null,
    },
  },
});

export default chatState;
