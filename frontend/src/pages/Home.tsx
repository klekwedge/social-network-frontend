import { Flex } from "@chakra-ui/react";
import { Post } from "../components/Post/Post";

export const Home = () => {
  return (
    <Flex alignItems="center" justifyContent="center" p="20px">
      <Flex>
        <Post isFullPost={false} />
      </Flex>
    </Flex>
  );
};
