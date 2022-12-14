import tw from "tailwind-styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useParams } from "react-router-dom";
dayjs.extend(relativeTime);

const UserStytle = tw.button`
  bg-gray-700
  rounded-full
  w-10
  h-10
  text-center
  font-semibold  
`;

const UserItemContainer = tw.li<{ $active: boolean } | any>`
  flex
  p-2
  items-center
  hover:bg-stone-800
  hover:cursor-pointer
  ${({ $active }) => $active && `bg-stone-800`}
`;

type UserItemProps = {
  // active?: boolean;
  id: string;
  username: string;
  // onClick?: () => void;
  lastMessage?: string;
  lastMessageTime?: string;
};

export function UserItem({
  // active,
  // onClick,
  id,
  username,
  lastMessage,
  lastMessageTime,
}: UserItemProps) {
  const params = useParams()
  return (
    <Link to={`/${id}`}>
      <UserItemContainer $active={params.chatId === id}>
        <div className="flex items-center">
          <UserStytle />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col ml-4">
            <span className="font-mono text-lg">{username}</span>
            <span className="text-s">{lastMessage || <>&nbsp;</>}</span>
          </div>
          <span>{lastMessage && dayjs(lastMessageTime).fromNow()}</span>
        </div>
      </UserItemContainer>
    </Link>
  );
}
