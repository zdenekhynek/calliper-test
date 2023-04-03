import { TComment } from "../types";

import styles from "./comment_thread_comment.module.css";

export default function CommentThreadComment(comment: TComment) {
  return (
    <div className={styles.comment}>
      <span className={styles.username}>{comment.userName}: </span>
      <span className={styles.text}>{comment.text}</span>
    </div>
  );
}
