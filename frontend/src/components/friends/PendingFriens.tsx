import { useEffect } from "react";
import tw from "tailwind-styled-components";
import Settings from "../../config";
import useAuth from "../../hooks/useAuth";
import { useFetchAllWithAuth } from "../../hooks/useFetchWithAuth";
import FriendsContainer from "./FriendsContainer";
import PendingRequestItem from "./PendingRequestItem";

const Container = tw.section<any>`
  ml-4
  mr-8
  mt-4
`;

type FriendRequest = {
  id: number;
  from_user: {
    id: number;
    username: string;
  };
  to_user: {
    id: number;
    username: string;
  };
};

export default function PendingFriends() {
  const [data, fetchFriendReq] = useFetchAllWithAuth<FriendRequest>();
  const { token } = useAuth();

  useEffect(() => {
    fetchFriendReq(Settings.urls.auth.pendingFriendRequests);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FriendsContainer>
      <Container>
        <ul>
          {data.data?.map((friendReq) => (
            <PendingRequestItem
              key={friendReq.id}
              name={friendReq.from_user.username}
              onClick={() => {
                fetch(Settings.urls.auth.acceptFriendRequest(friendReq.id), {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }).then(() =>
                  fetchFriendReq(Settings.urls.auth.pendingFriendRequests)
                );
              }}
            />
          ))}
        </ul>
      </Container>
    </FriendsContainer>
  );
}
