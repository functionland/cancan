import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getSharedVideos } from "../utils";
import { Video } from "../components/Video";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ProfileInfoPlus, VideoInfo } from "../utils/canister/typings";

type SharedByHashParams = {
  videoHash: string;
};
/*
 * Nothing fancy here, either!
 */
export function Shared({
  profileInfo,
  onRefreshUser,
}: {
  profileInfo?: ProfileInfoPlus;
  onRefreshUser: any;
}) {
  const [feed, setFeed] = useState<VideoInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { videoHash } = useParams<SharedByHashParams>();

  useEffect(() => {
    if (videoHash) {
      setIsLoading(true);
      getSharedVideos(videoHash)
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
        {
          feed.map((v) => (
            <Video
              key={v.videoId}
              videoInfo={v}
              onRefreshUser={onRefreshUser}
            />
          ))}
      </div>
    </main>
  );
}
