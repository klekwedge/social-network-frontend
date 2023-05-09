import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { FullPost } from "./pages/FullPost";
import { Profile } from "./pages/Profile/Profile";
import { AddPost } from "./pages/AddPost/AddPost";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hook";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { Header } from "./components/Header/Header";
import { Friends } from "./pages/Friends/Friends";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/posts/:id" element={<FullPost />} />
        {/* <Route path="/posts/:id/edit" element={<AddPost />} /> */}
        <Route path="/posts/edit" element={<AddPost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
