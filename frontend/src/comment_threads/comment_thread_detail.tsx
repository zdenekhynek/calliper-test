import { TCommentThreadResponse } from "../types";
import CommentReply from "./comment_reply";
import CommentThreadComment from "./comment_thread_comment";

import styles from "./comment_thread_detail.module.css";

export interface ICommentThreadDetailProps extends TCommentThreadResponse {
  onReply: (text: string) => void;
}

export default function CommentThreadDetail({
  comments,
  onReply,
}: ICommentThreadDetailProps) {
  return (
    <div className={styles.commentThreadDetail}>
      <ul className={styles.list}>
        {comments.map((comment, i) => {
          return (
            <li key={i} className={styles.listItem}>
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
