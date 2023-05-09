import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Input } from "@chakra-ui/react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./Friends.scss";
import axios from "../../axios";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectIsAuth } from "../../redux/slices/auth";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import { Post } from "../../components/Post/Post";

export const Friends = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      console.log(user);
    }
  }, []);

  useEffect(() => {
    // axios
    //   .get(`/posts/${id}`)
    //   .then((res) => {
    //     setData(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.warn(err);
    //     alert("Ошибка при получении статьи");
    //   });
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      gap="30px"
      flexDirection="column"
    >
      {isLoading
        ? [...Array(3)].map((obj, index) => <PostSkeleton key={index} />)
        : posts.items.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={
                post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""
              }
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
            />
          ))}
    </Flex>
  );
};
