import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "./Friends.scss";
import axios from "../../axios";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectIsAuth } from "../../redux/slices/auth";
// import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import { Post } from "../../components/Post/Post";

export const Friends = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);

  const getPosts = async () => {
    if (currentUser) {
      await axios.get(`/friend/${currentUser._id}`);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/register" />;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      gap="30px"
      flexDirection="column"
    >
      {/* {isLoading
        ? [...Array(3)].map((obj, index) => <PostSkeleton key={index} />)
        :  */}
      {posts.items.map((post) => (
        <Post
          key={post._id}
          text={post.text}
          imageUrl={
            post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""
          }
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
        />
      ))}
      {/* } */}
    </Flex>
  );
};
