import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Post } from "../components/Post/Post";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { fetchPosts } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    // dispatch(fetchTags());
  }, []);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      gap="30px"
      flexDirection="column"
    >
      {/* {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
        isPostsLoading ? (
          <Post key={index} isLoading={true} />
        ) : ( */}
      {/* <Post isFullPost={false} /> */}
      {isPostsLoading ? (
        <h1>Loading...</h1>
      ) : (
        posts.items.map((obj, index) => (
          <Post
            key={obj._id}
            id={obj._id}
            title={obj.title}
            imageUrl={
              obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
            }
            user={obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
          />
        ))
      )}
    </Flex>
  );
};
