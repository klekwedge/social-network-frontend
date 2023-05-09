import { Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import styles from "./Post.scss";

export const PostSkeleton = () => {
  return (
    <div className="post__skeleton skeleton">
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className="skeleton__content">
          <div className="skeleton__user">
            <SkeletonCircle size="10" m="0px 10px" />
            <div className="skeleton__user-details">
              <Skeleton width={60} height="20px" mb="5px" />
              <Skeleton width={100} height="15px" />
            </div>
          </div>
          <div className="skeleton__info">
            <Skeleton width="100%" height={45} mb="10px" />
            <Skeleton width="400px" height={90} />
          </div>
        </div>
      </Stack>
    </div>
  );
};
