import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loader from "../loader";
import Error from "../error";
import BarChart from "../bar_chart/bar_chart";
import { getShareData } from "../fetch_data";
import { transformChartData } from "../data_transformations";

import styles from "./chart_page.module.css";

export default function SharePage() {
  const { shareId } = useParams();

  const queryKey = [shareId];
  const {
    data: rawData,
    isLoading,
    error,
    isError,
  } = useQuery({
    retry: 0,
    queryKey,
    queryFn: async () => {
      return getShareData(shareId);
    },
  });
  const chartData = transformChartData(rawData);

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  return (
    <div data-testid="share-page" className={styles.chartPage}>
      <div className={styles.chartWrapper}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Fast-food sales across Western Europe</h2>
          </div>
          <div className={styles.sectionContent}>
            <div
              className={styles.chart}
              style={{ width: WIDTH, height: HEIGHT }}
            >
              <BarChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
