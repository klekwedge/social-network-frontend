import { Avatar, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface UserInfoProps {
  avatarUrl?: string;
  fullName: string;
  additionalText: string;
  userId: string;
}

export const UserInfo = ({
  avatarUrl,
  fullName,
  additionalText,
  userId,
}: UserInfoProps) => {

  return (
    <Flex display="flex" alignItems="center">
      <Link to={`/profile/${userId}`}>
        <Avatar
          src={avatarUrl ? `http://localhost:4444${avatarUrl}` : ""}
          w="30px"
          h="30px"
          borderRadius="30px"
          mr="10px"
        />
      </Link>

      <Flex flexDirection="column">
        <Heading as="span" fontWeight="500" fontSize="14px">
          {fullName}
        </Heading>
        <Heading as="span" fontSize="12px" opacity="0.6">
          {additionalText ? new Date(additionalText).toLocaleString() : ""}
        </Heading>
      </Flex>
    </Flex>
  );
};
