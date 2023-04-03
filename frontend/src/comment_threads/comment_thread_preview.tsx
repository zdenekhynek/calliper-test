import { TCommentThreadResponse } from "../types";
import CommentThreadComment from "./comment_thread_comment";

export default function CommentThreadPreview(thread: TCommentThreadResponse) {
  const { commentsCount, comments } = thread;

  const firstComment =
    Array.isArray(comments) && comments.length > 0 ? comments[0] : null;
  const numReplies = commentsCount - 1;

  return (
    <div>
      {firstComment && <CommentThreadComment {...firstComment} />}
      {numReplies > 0 && <div>{numReplies} replies</div>}
    </div>
  );
}
