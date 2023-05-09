import { Flex } from "@chakra-ui/react";
import { Post } from "../components/Post/Post";
import { Header } from "../components/Header/Header";

export const Home = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      flexDirection="column"
    >
      <Header />
      <Post isFullPost={false} />
    </Flex>
  );
};
