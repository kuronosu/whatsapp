import tw from "tailwind-styled-components";
import useAuth from "../hooks/useAuth";
import { useGetFriends } from "../store/atoms/chat";
import ChatPane from "./chat-pane/ChatPane";
import UsersPane from "./users-pane/UsersPane";

// export default function Home() {
//   const { token } = useAuth();
//   return (
//     <>
//       <div>
//         {token ? <Link to="/app">Chat</Link> : <Link to="/login">Login</Link>}
//       </div>
//       <p>Home</p>;
//     </>
//   );
// }

const Container = tw.div<any>`
  flex
  flex-row
  h-full
`;

export default function Home() {
  const { decodedToken } = useAuth();
  return (
    <Container>
      <div className="w-3/12 h-full">
        <UsersPane />
      </div>
      <div className="w-9/12 h-full shadow-2xl">
        <ChatPane />
      </div>
    </Container>
  );
}
