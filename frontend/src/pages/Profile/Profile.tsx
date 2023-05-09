import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchUser } from "../../redux/slices/users";
import { Avatar, Button, Flex, Heading } from "@chakra-ui/react";
import { fetchUserPosts } from "../../redux/slices/posts";
import { Post } from "../../components/Post/Post";

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

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPosts(id));
    }
  }, []);

  console.log(userPosts);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, []);

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

      // const { data } = isEditing
      // ? await axios.patch(`/posts/${id}`, fields)
      // : await axios.post("/posts", fields);
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

  return (
    <Flex flexDirection="column" p="0px 30px">
      {user ? (
        <Flex
          width="100%"
          height="100%"
          flexDirection="column"
          alignItems="center"
          position="relative"
          mb="30px"
        >
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

          <Heading as="h2" fontWeight="500" fontSize="25px" mb="10px">
            {user.fullName}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
            Город: {user.city ? user.city : "не указан"}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
            Возраст: {user.age ? user.age : "не указан"}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
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
            <Flex position="absolute" right="20px" gap="10px">
              <Button>Добавить в друзья</Button>
              <Button>Удалить из друзей</Button>
            </Flex>
          )}
        </Flex>
      ) : (
        ""
      )}

      <Heading as="h3" fontWeight="400" fontSize="25px" mb='20px'>
        Посты пользователя:
      </Heading>

      {userPosts.items.map((obj, index) => (
        <Post
          key={obj._id}
          id={obj._id}
          title={obj.title}
          imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""}
          user={obj.user}
          createdAt={obj.createdAt}
          viewsCount={obj.viewsCount}
        />
      ))}
    </Flex>
  );
};
