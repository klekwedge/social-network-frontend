import { Link } from "react-router-dom";
import Logo from "/src/assets/svg/logo-icon.svg";
import ExitIcon from "/src/assets/svg/exit-icon.svg";
import ThemeIcon from "/src/assets/svg/theme-icon.svg";
import ArrowIcon from "/src/assets/svg/arrow-bottom-icon.svg";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { logout } from "../../redux/slices/auth";
import { useEffect, useState } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.data);
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [color, setColor] = useState("light");

  useEffect(() => {
    if (currentUser) {
      setImageUrl(currentUser.avatarUrl || "");
    }
  }, [currentUser]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <Flex className="header" justifyContent="space-between">
      <Link className="header__logo" to="/">
        <img src={Logo} alt="logo icon" />
      </Link>
      <Menu closeOnSelect={false}>
        <MenuButton as="button">
          {currentUser?.avatarUrl ? (
            <Avatar
              src={`http://localhost:4444${imageUrl}`}
              w="32px"
              h="32px"
            />
          ) : (
            <Avatar src="#" w="32px" h="32px" />
          )}
          <img src={ArrowIcon} alt="arrow icon" />
        </MenuButton>
        <MenuList>
          <MenuItem className="menu__item" onClick={onToggle}>
            <img src={ThemeIcon} alt="theme icon" />
            <span>Тема: {color === "light" ? "Светлая" : "Тёмная"}</span>
            <Popover isOpen={isOpen} onClose={onClose}>
              <PopoverContent maxW="223px" h="90px">
                <PopoverBody>
                  <RadioGroup
                    value={color}
                    onChange={(newColor) => {
                      onClose();
                      setColor(newColor);
                    }}
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                  >
                    <Radio value="light">Светлая тема</Radio>
                    <Radio value="dark">Тёмная тема</Radio>
                  </RadioGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </MenuItem>
          <MenuItem>
            <Link to="/" onClick={onClickLogout} className="menu__item">
              <img src={ExitIcon} alt="exit icon" />
              <span>Выйти</span>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
