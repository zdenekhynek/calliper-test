import { TFoodBarData } from "../types";

import styles from "./bar_chart.module.css";

export function getEmojiForName(name: string) {
  let emoji = "";
  switch (name) {
    case "hotdog":
      emoji = "🌭";
      break;
    case "burger":
      emoji = "🍔";
      break;
    case "sandwich":
      emoji = "🥪";
      break;
    case "kebab":
      emoji = "🥙";
      break;
    case "fries":
      emoji = "🍟";
      break;
    case "donut":
      emoji = "🍩";
      break;
  }

  return emoji;
}

export type TFoodBarProps = TFoodBarData;

export default function FoodBar({
  name,
  value,
  x0,
  x1,
  y0,
  y1,
  backgroundColor,
}: TFoodBarProps) {
  const width = x1 - x0;
  const height = y0 - y1;

  return (
    <div
      data-testid="food-bar"
      className={styles.bar}
      style={{ top: y1, width, height, backgroundColor }}
    >
      <span className={styles.barLabel} title={name}>
        <span className={styles.barName}>{getEmojiForName(name)}</span>{" "}
        <span className={styles.barValue}>{value}</span>
      </span>
    </div>
  );
}
