// import { useParams } from "react-router-dom";
// import axios from "../axios";
import { Post } from "../components/Post/Post";

export const FullPost = () => {

  return (
    <>
      <Post
        // id={data._id}
        // title={data.title}
        // imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        // user={data.user}
        // createdAt={data.createdAt}
        // viewsCount={data.viewsCount}
        // commentsCount={3}
        // tags={data.tags}
        isFullPost={true}
      />
        {/* <ReactMarkdown children={data.text} /> */}
      {/* </Post> */}
    </>
  );
};
