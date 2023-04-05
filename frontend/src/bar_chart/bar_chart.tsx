import CountryBar from "./country_bar";
import { TBarChartData } from "../types";

import styles from "./bar_chart.module.css";

export interface IBarChartProps {
  data: TBarChartData;
}

export default function BarChart({ data }: IBarChartProps) {
  return (
    <div className={styles.barChart}>
      {data.map((d: any, i: number) => {
        return <CountryBar key={d.country} {...d} />;
      })}
    </div>
  );
}
