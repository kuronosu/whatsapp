import { useEffect } from "react";
import tw from "tailwind-styled-components";
import Settings from "../../config";
import { useFetchAllWithAuth } from "../../hooks/useFetchWithAuth";
import { Friend, useSetFriends } from "../../store/atoms/chat";
import UsersList from "./UsersList";
import UsersPaneHeader from "./UsersPaneHeader";

const UsersPaneContainer = tw.div<any>`
  m-0
  p-0
  flex
  h-full
  flex-col
`;

const useFetchFriends = () => {
  const setFriends = useSetFriends();
  const [data, _fetch] = useFetchAllWithAuth<Friend>();
  useEffect(() => {
    _fetch(Settings.urls.messages.friends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!data.loading && data.data) {
      setFriends(data.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return data;
};

export default function UsersPane() {
  const friendsReq = useFetchFriends();
  return (
    <UsersPaneContainer>
      <UsersPaneHeader />
      {friendsReq.loading ? <p>Loading</p> : <UsersList />}
    </UsersPaneContainer>
  );
}
