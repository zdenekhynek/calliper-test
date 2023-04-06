import styles from "./app.module.css";

export default function Error({ msg = "Oh, no" }) {
  return <div className={styles.error} data-testid="error">{msg}</div>;
}
