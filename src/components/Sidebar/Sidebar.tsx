import { Link } from "react-router-dom";
import NewsIcon from "/src/assets/svg/news-icon.svg";
import ProfileIcon from "/src/assets/svg/profile-icon.svg";
import FriendsIcon from "/src/assets/svg/friends-icon.svg";
import MessangerIcon from "/src/assets/svg/messanger-icon.svg";
import ImageIcon from "/src/assets/svg/photo-icon.svg";
import MusicIcon from "/src/assets/svg/music-icon.svg";
import VideoIcon from "/src/assets/svg/video-icon.svg";
import { Button, Flex } from "@chakra-ui/react";
import { selectIsAuth } from "../../redux/slices/auth";
import "./Sidebar.scss";
import { useAppSelector } from "../../hooks/redux-hook";

export const Sidebar = () => {

  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector((state) => state.auth.data?._id);
  const currentUser = useAppSelector((state) => state.auth.data);

  return (
    <Flex flexDirection="column" className="sidebar">
      {userId ? (
        <Link to={`/profile/${userId}`} className="sidebar__link">
          <img src={ProfileIcon} alt="profile icon" /> <span>Моя страница</span>
        </Link>
      ) : (
        ""
      )}
      <Link to="/" className="sidebar__link">
        <img src={NewsIcon} alt="news icon" /> <span>Новости</span>
      </Link>
      {isAuth ? (
        <>
          {userId ? (
            <>
              <Link to={`/`} className="sidebar__link">
                <img src={MessangerIcon} alt="messanger icon" />{" "}
                <span>Мессенджер</span>
              </Link>
              <Link to="/friends" className="sidebar__link">
                <img src={FriendsIcon} alt="friends icon" /> <span>Друзья</span>
              </Link>
              <Link to={`/`} className="sidebar__link">
                <img src={ImageIcon} alt="image icon" />
                <span>Фотографии</span>
              </Link>
              <Link to={`/`} className="sidebar__link">
                <img src={MusicIcon} alt="music icon" /> <span>Музыка</span>
              </Link>
              <Link to={`/`} className="sidebar__link">
                <img src={VideoIcon} alt="video icon" /> <span>Видео</span>
              </Link>
            </>
          ) : (
            ""
          )}
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
