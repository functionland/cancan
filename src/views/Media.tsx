import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getFeedVideos } from "../utils";
import { Video } from "../components/Video";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ProfileInfoPlus, VideoInfo } from "../utils/canister/typings";

type MediaByIdParams = {
  videoHash: string;
};
/*
 * Nothing fancy here, either!
 */
export function Media({
  currentUser,
}: {
  currentUser?: ProfileInfoPlus;
}) {
  const [media, setMedia] = useState<VideoInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { videoHash } = useParams<MediaByIdParams>();

  useEffect(() => {
    if (videoHash) {
      setIsLoading(true);
      getFeedVideos(currentUser.userName)
        .then((videos) => {
          setFeed(videos);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLoading(false);
        });
    }
  }, [videoHash]);

  return (
    <main>
      <LoadingIndicator
        loadingMessage="Loading videos..."
        completedMessage="Videos loaded"
        isLoading={isLoading}
      />
      <div className="feed">
            <Video
              videoInfo={media}
              userId={currentUser?.userName || ""}
              userRewardPoints={Number(currentUser?.rewards.toString())}
            />
      </div>
    </main>
  );
}
