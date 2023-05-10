import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { Profile } from "./pages/Profile/Profile";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hook";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { Header } from "./components/Header/Header";
import { Friends } from "./pages/Friends/Friends";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Container, Flex } from "@chakra-ui/react";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <Container maxWidth="1200px" m="0 auto" p="0px 20px">
      <Header />
      <Flex gap="60px">
        {isAuth ? <Sidebar /> : ""}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Flex>
    </Container>
  );
}

export default App;
