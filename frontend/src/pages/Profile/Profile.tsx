import { useState, useEffect, useRef } from "react";
import { AiFillEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchUser } from "../../redux/slices/users";
import {
  Avatar,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Input,
  Tooltip,
  useEditableContext,
  useEditableControls,
} from "@chakra-ui/react";
import { fetchUserPosts } from "../../redux/slices/posts";
import { Post } from "../../components/Post/Post";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import { changeAvatar } from "../../redux/slices/auth";

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <>
      <Button
        {...getSubmitButtonProps()}
        background="transparent"
        size="15px"
        p="5px"
        ml="5px"
      >
        <AiOutlineCheck size="18px" />
      </Button>
      <Button
        background="transparent"
        size="15px"
        p="5px"
        ml="5px"
        {...getCancelButtonProps()}
      >
        {" "}
        <AiOutlineClose size="18px" />
      </Button>
    </>
  ) : (
    // <Flex>
    <Button
      {...getEditButtonProps()}
      background="transparent"
      size="15px"
      p="5px"
      ml="5px"
    >
      <AiFillEdit size="18px" />
    </Button>
    // </Flex>
  );
}

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

      dispatch(changeAvatar(imageUrl));
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
    setImageUrl(currentUser?.avatarUrl || "");
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
            {isUserCurrent ? (
              <Flex flexDirection="column" mb="30px" gap="5px">
                <Editable
                  defaultValue={currentUser?.city ? currentUser.city : ""}
                  display="flex"
                  alignItems="center"
                  fontSize="20px"
                  gap="5px"
                  isPreviewFocusable={false}
                  onChange={(e) => {
                    console.log(e);
                  }}
                >
                  Город:
                  <EditablePreview />
                  <EditableInput p="0" />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={currentUser?.age ? String(currentUser.age) : ""}
                  display="flex"
                  gap="5px"
                  alignItems="center"
                  fontSize="20px"
                  isPreviewFocusable={false}
                  onChange={(e) => {
                    console.log(e);
                  }}
                >
                  Возраст:
                  <EditablePreview />
                  <EditableInput p="0" />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={
                    currentUser?.university ? currentUser.university : ""
                  }
                  display="flex"
                  alignItems="center"
                  fontSize="20px"
                  gap="5px"
                  isPreviewFocusable={false}
                  onChange={(e) => {
                    console.log(e);
                  }}
                >
                  Университет:
                  <EditablePreview />
                  <EditableInput p="0" />
                  <EditableControls />
                </Editable>
              </Flex>
            ) : (
              <>
                <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
                  Город: {user.city ? user.city : "не указан"}
                </Heading>
                <Heading as="h2" fontWeight="400" fontSize="20px" mb="5px">
                  Возраст: {user.age ? user.age : "не указан"}
                </Heading>
                <Heading as="h2" fontWeight="400" fontSize="20px" mb="30px">
                  Университет: {user.university ? user.university : "не указан"}
                </Heading>
              </>
            )}
            {isUserCurrent ? (
              <Flex mb="30px" gap="15px">
                <Button
                //  onClick={() => inputFileRef.current?.click()}
                >
                  Сохранить данные
                </Button>
                <Button onClick={() => inputFileRef.current?.click()}>
                  Изменить фото
                </Button>
                <input
                  ref={inputFileRef}
                  type="file"
                  onChange={handleChangeFile}
                  hidden
                />
                {imageUrl !== currentUser?.avatarUrl && (
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
        userPosts.items.map((obj) => (
          <Post
            key={obj._id}
            text={obj.text}
            imageUrl={
              obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
            }
            user={isUserCurrent && currentUser ? currentUser : obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
          />
        ))
      )}
    </Flex>
  );
};
