import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

import "./Post.scss";
import { Flex } from "@chakra-ui/react";
import { UserInfo } from "../UserInfo/UserInfo";
import { IUser } from "../../types";

interface PostProps {
  id: string;
  text: string;
  createdAt: string;
  imageUrl: string;
  user: IUser;
  viewsCount: number;
}

export const Post = ({
  id,
  text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
}: PostProps) => {
  // console.log(user);

  return (
    <Flex className="post" p="10px 20px 20px" gap='20px'>
      <UserInfo
        userId={user?._id}
        avatarUrl={user?.avatarUrl}
        fullName={user?.fullName}
        additionalText={createdAt}
      />
      {imageUrl && (
        <img className="post__image" src={imageUrl} alt="post photo" />
      )}
      <div className="post__indention">
        <h2 className="post__text">{text}</h2>
        <ul className="post__details">
          <li>
            <AiFillEye />
            <span>{viewsCount}</span>
          </li>
        </ul>
      </div>
    </Flex>
  );
};
