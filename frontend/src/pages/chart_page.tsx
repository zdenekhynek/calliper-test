import { useState } from "react";

import BarChart, { HEIGHT, WIDTH } from "../bar_chart/bar_chart";
import Loader from "../loader";
import Error from "../error";
import CommentThread from "../comment_threads/comment_thread";
import { postChartCommentThreads } from "../fetch_data";
import { TChartDataFeature, TCountry } from "../types";
import CommentSpot from "../comment_threads/comment_spot";
import generateRandomUsername from "../usernames";
import {
  addCommentSpotsToChartData,
  transformChartData,
} from "../data_transformations";
import { useChartDataQuery, useChartCommentThreadsQuery } from "../queries";
import ShareLink from "../share_link";

import styles from "./chart_page.module.css";

export default function ChartPage() {
  const [userName] = useState(() => generateRandomUsername());

  const { data: rawData = [], isLoading, error, isError } = useChartDataQuery();
  const chartData = transformChartData(rawData);

  const {
    data: commentThreads = [],
    isLoading: commentsIsLoading,
    refetch,
  } = useChartCommentThreadsQuery();

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

  const commentSpots = addCommentSpotsToChartData(commentThreads, chartData);

  //  render spots from the top to get the right vertical layering
  //  and no overlaps
  commentSpots.reverse();

  return (
    <div data-testid="chart-page" className={styles.chartPage}>
      <header className={styles.header}>
        <div className={styles.username}>
          <span>Hey</span> {userName}
        </div>
      </header>
      <div className={styles.chartWrapper}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Fast-food sales across Western Europe</h2>
            <div>
              <ShareLink />
            </div>
          </div>
          <div className={styles.sectionContent}>
            <div
              className={styles.chart}
              style={{ width: WIDTH, height: HEIGHT }}
            >
              <BarChart data={chartData} />
              <div className={styles.commentSpots}>
                {commentSpots.map((spot, i: number) => {
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
    </div>
  );
}
