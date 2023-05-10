import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

import "./Post.scss";
import { Flex } from "@chakra-ui/react";
import { UserInfo } from "../UserInfo/UserInfo";
import { IUser } from "../../types";

interface PostProps {
  id: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  user: IUser;
  viewsCount: number;
  children?: React.ReactNode;
  isFullPost?: boolean;
}

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  children,
  isFullPost,
}: PostProps) => {
  // console.log(user);

  return (
    <Flex className={`post ${isFullPost ? "post-full" : ""}`}>
      {imageUrl && (
        <img
          className={`post__image ${isFullPost ? "post__image-full" : ""}`}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className="post__wrapper">
        <UserInfo
          userId={user?._id}
          avatarUrl={user?.avatarUrl}
          fullName={user?.fullName}
          additionalText={createdAt}
        />
        <div className="post__indention">
          <h2 className={`post__title ${isFullPost ? "post__title-full" : ""}`}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
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
