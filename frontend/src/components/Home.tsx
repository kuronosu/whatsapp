import tw from "tailwind-styled-components";
import ChatPane from "./chat-pane/ChatPane";
import UsersPane from "./users-pane/UsersPane";

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
