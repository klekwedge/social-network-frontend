import { Link } from "react-router-dom";
import NewsIcon from "/src/assets/svg/news-icon.svg";
import ProfileIcon from "/src/assets/svg/profile-icon.svg";
import FriendsIcon from "/src/assets/svg/friends-icon.svg";

import { Button, Flex, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import "./Sidebar.scss";
import { useAppSelector } from "../../hooks/redux-hook";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userId = useAppSelector((state) => state.auth.data?._id);
  const currentUser = useAppSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <Flex flexDirection="column" className="sidebar">
      <Link to="/" className="sidebar__link">
        <img src={NewsIcon} alt="news icon" /> <span>Новости</span>
      </Link>
      {isAuth ? (
        <>
          {userId ? (
            <Link to={`/profile/${userId}`} className="sidebar__link">
              <img src={ProfileIcon} alt="profile icon" />{" "}
              <span>Моя страница</span>
            </Link>
          ) : (
            ""
          )}
          <Link to="/friends" className="sidebar__link">
            <img src={FriendsIcon} alt="friends icon" /> <span>Друзья</span>
          </Link>
          <Link to="/add-post" className="sidebar__link">
            <Button >Написать пост</Button>
          </Link>
          <Button onClick={onClickLogout}>
            Выйти
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
          <Link to="/register">
            <Button>Создать аккаунт</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};
