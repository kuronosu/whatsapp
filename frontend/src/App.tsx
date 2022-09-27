import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import Loading from "./components/Loading";
import ChatPane from "./components/chat-pane/ChatPane";
import EmptyContainer from "./components/EmptyContainer";
import FriendsPane from "./components/friends/FriendsPane";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider loading={<Loading />}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />}>
                <Route
                  path="/"
                  element={
                    <EmptyContainer
                      title="No chat selected"
                      subtitle="Select a chat to start messaging"
                    />
                  }
                />
                <Route path=":chatId" element={<ChatPane />} />
                <Route path="friends" element={<FriendsPane />} />
              </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
