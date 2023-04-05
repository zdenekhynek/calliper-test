import { useCallback, useRef, useState } from "react";
import { getShareLink } from "./fetch_data";

import styles from "./share_link.module.css";

export function getShareLinkForLink(token: string) {
  const host = window.location.origin;
  return `${host}/share/${token}`;
}

export default function ShareLink() {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const linkRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(async () => {
    //  do not double-fetch
    if (isLoading) {
      return false;
    }
    setIsLoading(true);

    try {
      const { token } = await getShareLink();
      setLinkUrl(getShareLinkForLink(token));

      setTimeout(() => {
        if (linkRef.current) {
          linkRef.current.classList.add(styles.linkDisappearing);
        }
      }, 17);

      setTimeout(() => {
        setLinkUrl("");
      }, 10000);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }, [isLoading]);

  const btnLabel = !isLoading ? "Share" : "Creating share link";

  return (
    <div className={styles.shareLink}>
      <button className={styles.btn} onClick={handleClick}>
        {btnLabel}
      </button>
      {linkUrl && (
        <div ref={linkRef} className={styles.link}>
          <a href={linkUrl} target="_blank" rel="noreferrer">
            {linkUrl}
          </a>
        </div>
      )}
    </div>
  );
}
