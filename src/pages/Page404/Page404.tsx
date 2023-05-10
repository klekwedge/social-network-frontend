import { Link } from "react-router-dom";
import "./Page404.scss";

export const Page404 = () => {
  return (
    <div className="mainbox__wrapper">
      <div className="mainbox">
        <div className="err">4</div>
        <div className="err2">0</div>
        <div className="err3">4</div>
        <div className="msg">
          Страница, которую вы ищете, не существует.
          <p>
            Перейти на <Link to="/">главную</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
