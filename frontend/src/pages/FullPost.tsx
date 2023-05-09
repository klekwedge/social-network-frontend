import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import axios from "../axios";
import { Post } from "../components/Post/Post";
import { IPost } from "../types";
import { PostSkeleton } from "../components/PostSkeleton/PostSkeleton";
import { Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/redux-hook";

export const FullPost = () => {
  const [data, setData] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <PostSkeleton isFull={true} />
      </Flex>
    );
  }

  return (
    <>
      {data ? (
        <Post
          id={data._id}
          title={data.title}
          imageUrl={
            data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""
          }
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          isFullPost={true}
        >
          <ReactMarkdown children={data.text} />
        </Post>
      ) : (
        ""
      )}
    </>
  );
};
