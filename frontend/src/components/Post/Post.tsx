import { Link } from "react-router-dom";
import { AiFillEye, AiFillDelete, AiFillEdit } from "react-icons/ai";

import "./Post.scss";
import { Flex } from "@chakra-ui/react";
import { UserInfo } from "../UserInfo/UserInfo";

interface PostProps {
  id: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  user: object;
  viewsCount: number;
  commentsCount: number;
  tags: string;
  children: React.ReactNode;
  isFullPost: boolean;
  isLoading: boolean;
  isEditable: boolean;
}

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
      avatarUrl: "https://bit.ly/dan-abramov",
      // avatarUrl: "",
      fullName: "Иванов Иван",
      additionalText: "text",
    };

    const id = 2121

    const title = "12z1z";
    const viewsCount = 121;
    const isEditable = true;

    const children = <h1>F</h1>;

    const imageUrl =
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80";

    return (
      <Flex className="post">
        {isEditable && (
          <div className="post__edit-buttons">
            <Link to={`/posts/${id}/edit`}>
              <AiFillEdit />
            </Link>
            <AiFillDelete />
          </div>
        )}
        {imageUrl && <img className="post__image" src={imageUrl} alt={title} />}
        <div className="post__wrapper">
          <UserInfo {...user} additionalText={createdAt} />
          <div className="post__indention">
            <h2 className="post__title">
              {/* {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>} */}
            </h2>
            {children && <div className="post__content">{children}</div>}
            <ul className="post__details">
              <li>
                <AiFillEye />
                <span>{viewsCount}</span>
              </li>
            </ul>
          </div>
        </div>
      </Flex>
    );
  };
