import { useQuery } from "react-query";
import { useCallback, useRef, useState } from "react";

import Loader from "./loader";
import Error from "./error";
import useOutsideClick from "./use_click_outside";
import { getChartCommentThreadResponses } from "./fetch_data";
import { TCommentThread, TCommentThreadResponse, TComment } from "./types";

export function CommentThreadComment(comment: TComment) {
  return (
    <div>
      <div>username: {comment.userName}</div>
      <div>text: {comment.text}</div>
    </div>
  );
}

export function CommentThreadPreview(thread: TCommentThreadResponse) {
  const { commentsCount, comments } = thread;

  const firstComment =
    Array.isArray(comments) && comments.length > 0 ? comments[0] : null;
  const numReplies = commentsCount - 1;

  return (
    <div>
      <div>{commentsCount}</div>
      {firstComment && <CommentThreadComment {...firstComment} />}
      {numReplies > 0 && <div>{numReplies} replies</div>}
    </div>
  );
}

export function CommentThreadDetail(thread: TCommentThreadResponse) {
  const { comments } = thread;

  return (
    <ul>
      {comments.map((comment, i) => {
        return (
          <li key={i}>
            <CommentThreadComment {...comment} />
          </li>
        );
      })}
    </ul>
  );
}

export default function CommentThread({
  id,
  chartDataPoint,
  commentsCount,
}: TCommentThread) {
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(wrapperRef, handleOutsideClick);

  //  fetch thread data only if we're displaying comments
  const shouldLoadData = isPreviewed || isOpen;

  const { data, isLoading, error, isError } = useQuery({
    retry: 0,
    queryKey: [id],
    enabled: shouldLoadData,
    queryFn: async () => {
      return getChartCommentThreadResponses(id);
    },
  });

  const handleMouseOver = useCallback(() => setIsPreviewed(true), []);
  const handleMouseOut = useCallback(() => setIsPreviewed(false), []);
  const handleClick = useCallback(() => {
    setIsPreviewed(false);
    setIsOpen(true);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  console.log("data", data);

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      ref={wrapperRef}
    >
      Comment thread: {commentsCount}
      {isPreviewed && !isOpen && data.comments && (
        <CommentThreadPreview {...data} />
      )}
      {isOpen && data.comments && <CommentThreadDetail {...data} />}
    </div>
  );
}
