import { useEffect, useRef, useState } from "react";
import { Button, Flex, Textarea } from "@chakra-ui/react";
import { Post } from "../../components/Post/Post";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { fetchPosts } from "../../redux/slices/posts";
import axios from "../../axios";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import "./Home.scss";

export const Home = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = async (event: any) => {
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
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    if (text) {
      try {
        const fields = {
          imageUrl,
          text,
        };

        const { data } = await axios.post("/posts", fields);

        setIsTextAreaOpen(false);
        setText("");
        setImageUrl('')
      } catch (error) {
        console.warn(error);
        alert("Ошибка при создании статьи");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="20px"
      gap="30px"
      flexDirection="column"
      className="home"
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        flexDirection="column"
      >
        <Textarea
          className={`home__input ${
            isTextAreaOpen ? "home__input-active" : ""
          }`}
          placeholder="Что у вас нового?"
          onFocus={() => setIsTextAreaOpen(true)}
          onBlur={(e) => {
            if (
              !text &&
              !e.relatedTarget?.className.includes("home__add-button")
            ) {
              setIsTextAreaOpen(false);
            }
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {imageUrl && (
          <div className="home__image-wrapper">
            <img
              className="home__image"
              src={`http://localhost:4444${imageUrl}`}
              alt="Uploaded"
            />
            {imageUrl && (
              <Button
                onClick={onClickRemoveImage}
                background="white"
                p="5px"
                m="0"
                size="15px"
              >
                <AiOutlineClose size="10px" />
              </Button>
            )}
          </div>
        )}
        {isTextAreaOpen ? (
          <Flex gap="5px" justifyContent="flex-end" w="100%">
            {imageUrl ? (
              ""
            ) : (
              <Button
                onClick={() => inputFileRef.current?.click()}
                className="home__add-button"
              >
                Загрузить фото
              </Button>
            )}
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            <Button onClick={onSubmit} className="home__add-button">
              Опубликовать
            </Button>
          </Flex>
        ) : (
          ""
        )}
      </Flex>
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
