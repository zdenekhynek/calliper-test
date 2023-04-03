import { useState, FormEvent } from "react";

import styles from "./comment_reply.module.css";

export default function CommentReply({
  onReply,
  placeholder = "Reply...",
}: {
  onReply: Function;
  placeholder?: string;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setContent("");
    if (onReply && typeof onReply === "function") {
      const { reply } = evt.target as any;
      onReply(reply.value);
    }
  };

  return (
    <form className={styles.reply} onSubmit={handleSubmit}>
      <textarea
        className={styles.textArea}
        name="reply"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        placeholder={placeholder}
      />
      <button className={styles.submitBtn} type="submit">&gt;</button>
    </form>
  );
}
