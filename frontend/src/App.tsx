import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { FullPost } from "./pages/FullPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* <Route path="/posts/:id" element={<FullPost />} /> */}
        <Route path="/posts" element={<FullPost />} />
      </Routes>
    </>
  );
}

export default App;
