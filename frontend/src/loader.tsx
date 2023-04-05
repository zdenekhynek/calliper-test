import styles from "./app.module.css";

export default function Loader({ msg = "Loading..."}) {
  return <div className={styles.loader} data-testid="loader">{msg}</div>;
}
