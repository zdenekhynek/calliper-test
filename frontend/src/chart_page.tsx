import { useState } from "react";
import { useQuery } from "react-query";
import { scaleLinear, scaleBand } from "d3-scale";

import Chart from "./chart";
import Loader from "./loader";
import Error from "./error";
import CommentThread from "./comment_threads/comment_thread";
import {
  getChartData,
  getChartCommentThreads,
  postChartCommentThreads,
} from "./fetch_data";
import {
  TCommentThread,
  TChartDataPoint,
  TChartDataFeature,
  TCountry,
} from "./types";

import styles from "./chart_page.module.css";
import CommentSpot from "./comment_threads/comment_spot";

export default function ChartPage() {
  const [userName] = useState(() => "Steve");
  const { data, isLoading, error, isError } = useQuery({
    retry: 0,
    queryKey: ["chart"],
    queryFn: async () => {
      return getChartData();
    },
  });

  const {
    data: commentThreads,
    isLoading: commentsIsLoading,
    refetch,
  } = useQuery({
    retry: 0,
    queryKey: ["commentThreads"],
    queryFn: async () => {
      return getChartCommentThreads();
    },
  });

  const handleAddCommentThread = async (
    feature: TChartDataFeature,
    country: TCountry,
    text: string
  ) => {
    await postChartCommentThreads(
      {
        feature,
        country,
      },
      { userName, text }
    );
    refetch();
  };

  const handleAddCommentThreadResponse = async () => {
    //  not so great to refetch all response just to amend
    //  the view count but good-enough for take-home
    refetch();
  };

  if (isLoading || commentsIsLoading) {
    return <Loader />;
  }

  if (isError && error) {
    return <Error msg={error.toString()} />;
  }

  //  compute positions
  const dataWithTotals = data.map((d: any) => {
    const features: any[] = [];
    const { country } = d;

    const total = Object.keys(d)
      .filter((k) => k !== "country")
      .reduce((acc, featureKey: any) => {
        const value = +d[featureKey];
        features.push({ name: featureKey, value });
        return (acc += +d[featureKey]);
      }, 0);

    return { country, features, total };
  });

  const totals = dataWithTotals.map((d: any) => d.total);
  const maxTotals = Math.max(...totals);

  const xScale = scaleBand()
    .domain(dataWithTotals.map((d: any) => d.country))
    .range([0, 800])
    .paddingInner(0.25)
    .paddingOuter(0.25)
    .align(0.5)
    .round(true);

  const yScale = scaleLinear().domain([0, maxTotals]).range([0, 600]);
  const colorScale = scaleLinear<string>()
    .domain([0, 5])
    .range(["#fba204", "#1b186c", "#b9afd5", "#5a2a53"]);

  const commentThreadLookup = commentThreads.reduce(
    (acc: any, commentThread: TCommentThread) => {
      const key = `${commentThread.chartDataPoint.country}-${commentThread.chartDataPoint.feature}`;
      acc[key] = commentThread;
      return acc;
    },
    {}
  );

  const positionedData = dataWithTotals.map((d: any) => {
    let currY = 600;

    const { country } = d;
    const x0 = xScale(country) || 0;
    const x1 = x0 + xScale.bandwidth();

    const features = d.features.map((f: any, i: number) => {
      const y0 = currY;
      const y1 = y0 - yScale(f.value);
      currY = y1;

      const backgroundColor = colorScale(i);

      //  attach comment thread
      const key = `${d.country}-${f.name}`;
      const commentThread = commentThreadLookup[key] || null;

      return { ...f, country, x0, x1, y0, y1, backgroundColor, commentThread };
    });

    return { ...d, x0, x1, features };
  });

  const commentSpots = positionedData.reduce((acc: any, posData: any) => {
    return acc.concat(posData.features);
  }, []);

  //  render spots from the top to get the right vertical layering 
  //  and no overlaps
  commentSpots.reverse();

  return (
    <div className={styles.chartPage}>
      <header className={styles.header}>
        <div>
          Hey {userName}
          <button>Share</button>
        </div>
      </header>
      <div className={styles.chartWrapper}>
        <div className={styles.section}>
          <div className={styles.chart}>
            <Chart data={positionedData} />
            <div className={styles.commentSpots}>
              {commentSpots.map((spot: any, i: number) => {
                const { commentThread, country, name, x1, y1 } = spot;

                return (
                  <div
                    key={i}
                    className={styles.commentSpot}
                    style={{ left: x1, top: y1 }}
                  >
                    {!commentThread && (
                      <CommentSpot
                        feature={name}
                        country={country}
                        onReply={handleAddCommentThread}
                      />
                    )}
                    {commentThread && (
                      <CommentThread
                        userName={userName}
                        onReply={handleAddCommentThreadResponse}
                        {...commentThread}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
