import FoodBar from "./food_bar";
import { TFoodBarData, TCountryBarData } from "../types";

import styles from "./bar_chart.module.css";

export type TCountryBarProps = TCountryBarData;

export default function CountryBar({
  country,
  x0,
  x1,
  features,
}: TCountryBarProps) {
  const style = { left: x0, width: x1 - x0 };
  return (
    <div className={styles.countryBar} style={style}>
      {features.map((f: TFoodBarData, i: number) => (
        <FoodBar key={i} {...f} />
      ))}
      <div className={styles.label}>{country}</div>
    </div>
  );
}
