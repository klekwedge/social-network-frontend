import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { FullPost } from "./pages/FullPost";
import { AddPost } from "./pages/AddPost/AddPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* <Route path="/posts/:id" element={<FullPost />} /> */}
        <Route path="/posts" element={<FullPost />} />
        {/* <Route path="/posts/:id/edit" element={<AddPost />} /> */}
        <Route path="/posts/edit" element={<AddPost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
