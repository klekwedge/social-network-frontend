import { useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Input } from "@chakra-ui/react";
import "./AddPost.scss";
// import axios from "../../axios";

export const AddPost = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const isAuth = useSelector(selectIsAuth);
  // const [isLoading, setLoading] = React.useState(false);
  // const [text, setText] = React.useState("");
  // const [title, setTitle] = React.useState("");
  // const [tags, setTags] = React.useState("");
  // const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // const isEditing = Boolean(id);

  const handleChangeFile = async (event: any) => {
    try {
      // const formData = new FormData();
      // const file = event.target.files[0];
      // formData.append("image", file);
      // const { data } = await axios.post("/upload", formData);
      // setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  };

  // const onClickRemoveImage = () => {
  //   setImageUrl("");
  // };

  // const onChange = React.useCallback((value) => {
  //   setText(value);
  // }, []);

  // const onSubmit = async () => {
  //   try {
  //     setLoading(true);

  //     const fields = {
  //       title,
  //       imageUrl,
  //       tags,
  //       text,
  //     };

  //     const { data } = isEditing
  //       ? await axios.patch(`/posts/${id}`, fields)
  //       : await axios.post("/posts", fields);

  //     const _id = isEditing ? id : data._id;

  //     navigate(`/posts/${_id}`);
  //   } catch (error) {
  //     console.warn(error);
  //     alert("Ошибка при создании статьи");
  //   }
  // };

  // React.useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`posts/${id}`)
  //       .then(({ data }) => {
  //         setTitle(data.title);
  //         setText(data.text);
  //         setImageUrl(data.imageUrl);
  //         setTags(data.tags.join(","));
  //       })
  //       .catch((err) => {
  //         console.warn(err);
  //         alert("Ошибка при получении статьи");
  //       });
  //   }
  // }, []);

  // const options = React.useMemo(
  //   () => ({
  //     spellChecker: false,
  //     maxHeight: "400px",
  //     autofocus: true,
  //     placeholder: "Введите текст...",
  //     status: false,
  //     autosave: {
  //       enabled: true,
  //       delay: 1000,
  //     },
  //   }),
  //   []
  // );

  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to="/" />;
  // }

  const id = 2121;

  const title = "12z1z";
  const viewsCount = 121;
  const isEditable = true;

  const children = <h1>F</h1>;

  const tags = 2121;
  const isEditing = true;

  const imageUrl =
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80";

  return (
    <Flex p="30" flexDirection="column">
      <Flex mb="30px" gap='15px'>
        <Button onClick={() => inputFileRef.current?.click()}>
          Загрузить превью
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <Button
          // onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
        )}
      </Flex>
      {imageUrl && (
        <img
          className="add-post__image"
          src={imageUrl}
          // src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <Input
        className="add-post__input"
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        // onChange={(e) => setTitle(e.target.value)}
        // fullWidth
      />
      <Input
        className="add-post__tags"
        variant="standard"
        placeholder="Тэги"
        value={tags}
        // onChange={(e) => setTags(e.target.value)}
        // fullWidth
      />
      {/* <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      /> */}
      <div className="add-post__buttons">
        <Button
          //  onClick={onSubmit}
        >
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button>Отмена</Button>
        </a>
      </div>
    </Flex>
  );
};
