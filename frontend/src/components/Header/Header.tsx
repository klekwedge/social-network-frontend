import { Link } from "react-router-dom";
import Logo from "/src/assets/svg/logo-icon.svg";
import { Flex } from "@chakra-ui/react";
import "./Header.scss";

export const Header = () => {
  return (
    <div className="header">
      <Flex>
        <Link className="header__logo" to="/">
          <img src={Logo} alt="logo icon" />
        </Link>
      </Flex>
    </div>
  );
};
