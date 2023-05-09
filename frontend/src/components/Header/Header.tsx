import { Link } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import "./Header.scss";
import { useAppSelector } from "../../hooks/redux-hook";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useAppSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className="header">
      <Flex>
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <div>VK</div>
          </Link>
          <div className="header__buttons">
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать пост</Button>
                </Link>
                <Button onClick={onClickLogout}>Выйти</Button>
                <Button>{currentUser?.fullName}</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Flex>
    </div>
  );
};
