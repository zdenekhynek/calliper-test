import { useCallback, useRef, useState } from "react";
import cn from "classnames";

import { TChartDataFeature, TCountry } from "../types";
import useOutsideClick from "../use_click_outside";
import CommentReply from "./comment_reply";

import styles from "./comment_spot.module.css";

export interface ICommentSpotProps {
  feature: TChartDataFeature;
  country: TCountry;
  onReply: Function;
}

export default function CommentSpot({
  feature,
  country,
  onReply,
}: ICommentSpotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  //  close form when clicking away from the component
  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(wrapperRef, handleOutsideClick);

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleReply = useCallback(
    (text: string) => {
      onReply(feature, country, text);
    },
    [onReply, country, feature]
  );

  const classNames = cn(styles.spot, { [styles.spotOpen]: isOpen });

  return (
    <div
      role="button"
      ref={wrapperRef}
      className={classNames}
      onClick={handleClick}
    >
      {isOpen && (
        <div className={styles.reply}>
          <CommentReply placeholder="Comment" onReply={handleReply} />
        </div>
      )}
    </div>
  );
}
