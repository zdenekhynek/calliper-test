import { TCommentThreadResponse } from "../types";
import CommentThreadComment from "./comment_thread_comment";

import styles from "./comment_thread_preview.module.css";

export default function CommentThreadPreview(thread: TCommentThreadResponse) {
  const { commentsCount, comments } = thread;

  const firstComment =
    Array.isArray(comments) && comments.length > 0 ? comments[0] : null;
  const numReplies = commentsCount - 1;
  const replyLabel = numReplies > 1 ? "replies" : "reply";

  return (
    <div>
      {firstComment && <CommentThreadComment {...firstComment} />}
      {numReplies > 0 && (
        <div className={styles.numReplies}>
          {numReplies} {replyLabel}
        </div>
      )}
    </div>
  );
}
