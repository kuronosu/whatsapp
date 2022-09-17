import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";

function Loading() {
  return <p>Loading</p>;
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider loading={<Loading/>}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
