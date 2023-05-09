import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import axios from "../../axios";
import { Post } from "../../components/Post/Post";
import { IPost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";
import { fetchUser } from "../../redux/slices/users";
import { Flex } from "@chakra-ui/react";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const user = useAppSelector((state) => state.users.currentUser);
  const currentUser = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, []);

  // if (user && currentUser) {
  //   console.log(user._id === currentUser._id);
  // }

  // useEffect(() => {
  //   axios
  //     .get(`/posts/${id}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //       alert("Ошибка при получении статьи");
  //     });
  // }, []);

  // if (isLoading) {
  //   return <Post isLoading={isLoading} isFullPost />;
  // }

  // fullName: string;
  // _id: string;
  // email: string;
  // passwordHash: string;
  // avatarUrl?: string,
  // city?: string,
  // age?: number,
  // university?: string,

  return (
    <>
      {user ? (
        <Flex>
          <img src={user.avatarUrl} alt="" />
          <h2>{user.fullName}</h2>
          <h3>{user.city}</h3>
          <h3>{user.age}</h3>
          <h3>{user.university}</h3>
        </Flex>
      ) : (
        // <h1>{currentUser}</h1>
        // <Post
        //   id={data._id}
        //   title={data.title}
        //   // imageUrl={
        //   //   data.imageUrl ? `http://localhost:4444/${data.imageUrl}` : ""
        //   // }

        //   imageUrl={data.imageUrl}
        //   user={data.user}
        //   createdAt={data.createdAt}
        //   viewsCount={data.viewsCount}
        //   isFullPost={true}
        // >
        //   <ReactMarkdown children={data.text} />
        // </Post>
        ""
      )}
    </>
  );
};
