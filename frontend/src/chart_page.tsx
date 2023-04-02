import { useState } from "react";
import { useQuery } from "react-query";

import Loader from "./loader";
import Error from "./error";
import CommentThread from "./comment_thread";
import {
  getChartData,
  getChartCommentThreads,
  postChartCommentThreads,
} from "./fetch_data";
import { TCommentThread } from "./types";

export default function ChartPage() {
  const [userName] = useState(() => "Steve");
  const { data, isLoading, error, isError } = useQuery({
    retry: 0,
    queryKey: ["chart"],
    queryFn: async () => {
      return getChartData();
    },
  });

  const { data: commentThreads, refetch } = useQuery({
    retry: 0,
    queryKey: ["commentThreads"],
    queryFn: async () => {
      return getChartCommentThreads();
    },
  });

  const handleAddCommentThread = async () => {
    await postChartCommentThreads(
      {
        feature: "kebab",
        country: "DE",
      },
      { userName: "user", text: "test comment" }
    );
    refetch();
  };

  const handleAddCommentThreadResponse = async () => {
    //  not so great to refetch
    //  but good-enough for take-home
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  return (
    <div>
      Chart page
      <button onClick={handleAddCommentThread}>Add comment thread</button>
      {commentThreads &&
        commentThreads.map((thread: TCommentThread) => (
          <CommentThread
            key={thread.id}
            userName={userName}
            onReply={handleAddCommentThreadResponse}
            {...thread}
          />
        ))}
    </div>
  );
}
