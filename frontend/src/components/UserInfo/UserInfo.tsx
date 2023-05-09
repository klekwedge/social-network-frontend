import React from "react";
import styles from "./UserInfo.scss";
import { Avatar, Flex, Heading } from "@chakra-ui/react";

interface UserInfoProps {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}

export const UserInfo = ({
  avatarUrl,
  fullName,
  additionalText,
}: UserInfoProps) => {
  return (
    <Flex display="flex" alignItems="center">
      <Avatar src={avatarUrl} w="30px" h="30px" borderRadius="30px" mr="10px" />
      <Flex flexDirection="column">
        <Heading as="span" fontWeight="500" fontSize="14px">
          {fullName}
        </Heading>
        <Heading as="span" fontSize="12px" opacity="0.6">
          {additionalText}
        </Heading>
      </Flex>
    </Flex>
  );
};
