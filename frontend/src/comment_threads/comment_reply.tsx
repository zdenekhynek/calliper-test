import { useState, FormEvent } from "react";

import styles from "./comment_reply.module.css";

export interface ICommentReplyProps {
  onReply: (text: string) => void;
  placeholder?: string;
}

export default function CommentReply({
  onReply,
  placeholder = "Reply...",
}: ICommentReplyProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (onReply && typeof onReply === "function") {
      onReply(content);
    }

    setContent("");
  };

  return (
    <form className={styles.reply} onSubmit={handleSubmit}>
      <textarea
        data-testid="reply-textarea"
        className={styles.textArea}
        name="reply"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        placeholder={placeholder}
      />
      <button
        data-testid="reply-submit-btn"
        className={styles.submitBtn}
        type="submit"
      >
        &gt;
      </button>
    </form>
  );
}
