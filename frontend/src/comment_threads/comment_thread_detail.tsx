import { TCommentThreadResponse } from "../types";
import CommentReply from "./comment_reply";
import CommentThreadComment from "./comment_thread_comment";

import styles from "./comment_thread_detail.module.css";

export default function CommentThreadDetail({
  comments,
  onReply,
}: TCommentThreadResponse & { onReply: Function }) {
  return (
    <div className={styles.commentThreadDetail}>
      <ul className={styles.list}>
        {comments.map((comment, i) => {
          return (
            <li key={i}>
              <CommentThreadComment {...comment} />
            </li>
          );
        })}
      </ul>
      <div className={styles.reply}>
        <CommentReply onReply={onReply} />
      </div>
    </div>
  );
}
