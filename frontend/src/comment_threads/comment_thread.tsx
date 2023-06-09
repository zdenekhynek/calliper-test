import { useCallback, useRef, useState } from "react";
import cn from "classnames";

import Error from "../error";
import useOutsideClick from "../use_click_outside";
import CommentThreadPreview from "./comment_thread_preview";
import CommentThreadDetail from "./comment_thread_detail";
import { postChartCommentThreadResponses } from "../fetch_data";
import { TCommentThread } from "../types";

import styles from "./comment_thread.module.css";
import { useChartCommentThreadResponsesQuery } from "../queries";

export default function CommentThread({
  id,
  commentsCount,
  userName,
  onReply,
}: TCommentThread & { userName: string; onReply: Function }) {
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(wrapperRef, handleOutsideClick);

  //  fetch thread data only if we're displaying comments
  const shouldLoadData = isPreviewed || isOpen;

  const {
    data = {},
    error,
    isError,
    refetch,
  } = useChartCommentThreadResponsesQuery(id, shouldLoadData);

  const handleMouseOver = useCallback(() => setIsPreviewed(true), []);
  const handleMouseOut = useCallback(() => setIsPreviewed(false), []);
  const handleClick = useCallback(() => {
    setIsPreviewed(false);
    setIsOpen(true);
  }, []);

  const handleAddCommentThreadReply = async (reply: string) => {
    const comment = { userName, text: reply };
    await postChartCommentThreadResponses(id, comment);
    refetch();

    //  let parent component know
    if (onReply && typeof onReply === "function") {
      onReply();
    }
  };

  const classNames = cn(styles.commentThread, {
    [styles.commentThreadPreviewed]: isPreviewed,
    [styles.commentThreadOpen]: isOpen,
  });

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  return (
    <div
      className={classNames}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      ref={wrapperRef}
    >
      <div className={styles.header}>
        {!isPreviewed && !isOpen && <span>{commentsCount}</span>}
        {isPreviewed && !isOpen && data.comments && (
          <CommentThreadPreview {...data} />
        )}
      </div>

      {isOpen && data && data.comments && (
        <CommentThreadDetail onReply={handleAddCommentThreadReply} {...data} />
      )}
    </div>
  );
}
