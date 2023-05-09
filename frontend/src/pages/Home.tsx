import { Flex } from "@chakra-ui/react";
import { Post } from "../components/Post/Post";

export const Home = () => {
  return (
    <>
      <Flex>
        <Flex>
          <Post isFullPost={false}/>
        </Flex>
      </Flex>
    </>
  );
};
