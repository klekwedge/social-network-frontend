import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchUser } from "../../redux/slices/users";
import { Avatar, Button, Flex, Heading } from "@chakra-ui/react";
import { fetchUserPosts } from "../../redux/slices/posts";
import { Post } from "../../components/Post/Post";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [isUserCurrent, setIsUserCurrent] = useState(false);
  const user = useAppSelector((state) => state.users.user);
  const currentUser = useAppSelector((state) => state.auth.data);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { userPosts } = useAppSelector((state) => state.posts);
  const isPostsLoading = userPosts.status === "loading";
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (user && currentUser) {
      const isFind = currentUser.friends.find((id) => id === user._id);
      console.log(isFind);
      setIsFriend(!!isFind);
    }
  }, [currentUser, user]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPosts(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id]);

  useEffect(() => {
    if (currentUser && id === currentUser._id) {
      setIsUserCurrent(true);
      setImageUrl(currentUser.avatarUrl || "");
    }
  }, [currentUser, id]);

  const onSubmit = async () => {
    try {
      // setLoading(true);

      await axios.patch(`/user/${id}`, {
        imageUrl,
      });
    } catch (error) {
      console.warn(error);
      alert("Ошибка при обновлении фотографии");
    }
  };

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      try {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("/upload", formData);
        setImageUrl(data.url);
      } catch (error) {
        console.warn(error);
        alert("Ошибка при загрузке файла");
      }
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const addFriend = async () => {
    if (currentUser?._id && user?._id) {
      await axios.post("/friend", {
        user: currentUser._id,
        friend: user._id,
      });
    }
  };

  const removeFriend = async () => {
    if (currentUser?._id && user?._id) {
      await axios.patch("/friend", {
        user: currentUser._id,
        friend: user._id,
      });
    }
  };

  return (
    <Flex flexDirection="column">
      {user ? (
        <Flex position="relative" alignItems="center" mb="30px" gap="30px">
          {imageUrl ? (
            <Avatar
              src={`http://localhost:4444${imageUrl}`}
              w="200px"
              h="200px"
              mb="10px"
            />
          ) : (
            <Avatar src="#" w="200px" h="200px" mb="10px" />
          )}
          <Flex flexDirection="column">
            <Heading as="h2" fontWeight="500" fontSize="25px" mb="10px">
              {user.fullName}
            </Heading>
            <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
              Город: {user.city ? user.city : "не указан"}
            </Heading>
            <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
              Возраст: {user.age ? user.age : "не указан"}
            </Heading>
            <Heading as="h2" fontWeight="400" fontSize="20px" mb="30px">
              Университет: {user.university ? user.university : "не указан"}
            </Heading>
            {isUserCurrent ? (
              <Flex mb="30px" gap="15px">
                <Button onClick={() => inputFileRef.current?.click()}>
                  Изменить фото
                </Button>
                <input
                  ref={inputFileRef}
                  type="file"
                  onChange={handleChangeFile}
                  hidden
                />
                {imageUrl !== user.avatarUrl && (
                  <Flex gap="15px">
                    <Button onClick={onClickRemoveImage}>Удалить</Button>
                    <Button onClick={onSubmit}>Сохранить</Button>
                  </Flex>
                )}
              </Flex>
            ) : (
              <Flex gap="10px">
                {isFriend}
                {isFriend ? (
                  <Button
                    onClick={() => {
                      setIsFriend(false);
                      removeFriend();
                    }}
                    p="5px 10px"
                    backgroundColor="blackAlpha.200"
                  >
                    Удалить из друзей
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsFriend(true);
                      addFriend();
                    }}
                    p="5px 10px"
                    backgroundColor="blackAlpha.200"
                  >
                    Добавить в друзья
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      ) : (
        ""
      )}
      <Heading as="h3" fontWeight="400" fontSize="25px" mb="20px">
        Посты пользователя:
      </Heading>
      {isPostsLoading ? (
        <Flex flexDirection="column" gap="20px">
          <PostSkeleton />
          <PostSkeleton />
        </Flex>
      ) : (
        userPosts.items.map((obj, index) => (
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
