import styles from "./chart.module.css";

export function Bar({ name, value, x0, x1, y0, y1, backgroundColor }: any) {
  const width = x1 - x0;
  const height = y0 - y1;

  return (
    <div
      className={styles.bar}
      style={{ top: y1, width, height, backgroundColor }}
    />
  );
}

export function CountryBar({ country, x0, x1, features, total }: any) {
  const style = { left: x0, width: x1 - x0 };

  return (
    <div className={styles.countryBar} style={style}>
      {features.map((f: any, i: any) => (
        <Bar key={i} {...f} />
      ))}
      <div className={styles.label}>
        {country}
      </div>
    </div>
  );
}

export default function BarChart({ data }: any) {
  return (
    <div className={styles.barChart}>
      {data.map((d: any, i: number) => {
        return <CountryBar key={d.country} {...d} />;
      })}
    </div>
  );
}
