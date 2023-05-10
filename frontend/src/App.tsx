import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { Profile } from "./pages/Profile/Profile";
import { useAppDispatch } from "./hooks/redux-hook";
import { fetchAuthMe } from "./redux/slices/auth";
import { Header } from "./components/Header/Header";
import { Friends } from "./pages/Friends/Friends";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Container, Flex } from "@chakra-ui/react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <Container maxWidth="1200px" m="0 auto" p="0px 20px">
      <Header />
      <Flex gap='60px'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Flex>
    </Container>
  );
}

export default App;
