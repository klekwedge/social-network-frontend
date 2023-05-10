import { Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import "./PostSkeleton.scss";

interface PostSkeletonProps {
  isFull?: boolean;
}

export const PostSkeleton = ({ isFull }: PostSkeletonProps) => {
  return (
    <div className={`skeleton ${isFull ? 'skeleton__full' :''}`}>
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
            <Skeleton width="550px" height={90} />
          </div>
        </div>
      </Stack>
    </div>
  );
};
