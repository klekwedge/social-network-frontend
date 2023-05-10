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
  const currentUser = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      console.log(currentUser);
    }
  }, []);

  const getPosts = async () => {
    if (currentUser) {
      const { data } = await axios.get(`/friend/${currentUser._id}`);
      console.log(data);
    }
  };

  useEffect(() => {
    getPosts();
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
              text={post.text}
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
