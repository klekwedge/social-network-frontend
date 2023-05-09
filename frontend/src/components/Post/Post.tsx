import { Link } from "react-router-dom";
import "./Post.scss";
import { Flex } from "@chakra-ui/react";
import { UserInfo } from "../UserInfo/UserInfo";

export const Post = () =>
  //   {
  //   // id,
  //   // title,
  //   // createdAt,
  //   // imageUrl,
  //   // user,
  //   // viewsCount,
  //   // commentsCount,
  //   // tags,
  //   // children,
  //   // isFullPost,
  //   // isLoading,
  //   // isEditable,
  // }
  {
    const createdAt = "21";
    const user = {
      // avatarUrl: "https://bit.ly/dan-abramov",
      avatarUrl: "",
      fullName: "Иванов Иван",
      additionalText: "text",
    };

    return (
      <Flex>
        {/* {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )} */}
        <div>
          <UserInfo {...user} additionalText={createdAt} />
          {/* <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div> */}
        </div>
      </Flex>
    );
  };
