import { useCallback, useRef, useState } from "react";
import cn from "classnames";

import { TChartDataFeature, TCountry } from "../types";
import useOutsideClick from "../use_click_outside";
import CommentReply from "./comment_reply";

import styles from "./comment_spot.module.css";

export default function CommentSpot({
  feature,
  country,
  onReply,
}: {
  feature: TChartDataFeature;
  country: TCountry;
  onReply: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(wrapperRef, handleOutsideClick);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleReply = (text: string) => {
    onReply(feature, country, text);
  };

  const classNames = cn(styles.spot, { [styles.spotOpen]: isOpen });

  return (
    <div ref={wrapperRef} className={classNames} onClick={handleClick}>
      {isOpen && (
        <div className={styles.reply}>
          <CommentReply placeholder="Comment" onReply={handleReply} />
        </div>
      )}
    </div>
  );
}
