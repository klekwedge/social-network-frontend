import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Post } from "../components/Post/Post";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { fetchPosts } from "../redux/slices/posts";
import { PostSkeleton } from "../components/PostSkeleton/PostSkeleton";

export const Home = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      gap="30px"
      flexDirection="column"
    >
      {isPostsLoading
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
