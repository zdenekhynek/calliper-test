import { scaleBand, scaleLinear } from "d3-scale";

import {
  addFeatureTotals,
  extendFeaturesWithScales,
  transformChartData,
  addCommentSpotsToChartData,
} from "./data_transformations";
import {
  TChartCountryFeatures,
  TCommentThreadsResponse,
  TCountry,
} from "./types";

describe("ChartDataTransform", () => {
  const testData: TChartCountryFeatures[] = [
    {
      country: "DE" as TCountry,
      hotdog: 10,
      burger: 20,
      sandwich: 30,
    },
    {
      country: "BE" as TCountry,
      hotdog: 15,
      burger: 25,
      sandwich: 35,
    },
  ];

  const testCommentThreads: TCommentThreadsResponse = [
    {
      id: "1",
      chartDataPoint: {
        country: "DE" as TCountry,
        feature: "hotdog",
      },
      commentsCount: 2,
      // responses: [],
    },
  ];

  test("addFeatureTotals should compute the correct totals", () => {
    const result = addFeatureTotals(testData);
    expect(result[0].total).toEqual(60);
    expect(result[1].total).toEqual(75);
  });

  test("extendFeaturesWithScales should compute the correct scales", () => {
    const dataWithTotals = addFeatureTotals(testData);
    const xScale = scaleBand().domain(["DE", "BE"]).range([0, 800]);
    const yScale = scaleLinear().domain([0, 75]).range([0, 500]);
    const colorScale = scaleLinear<string>()
      .domain([0, 5])
      .range(["#fba204", "#1b186c"]);

    const result = extendFeaturesWithScales(
      dataWithTotals,
      xScale,
      yScale,
      colorScale
    );
    expect(result[0].x0).toBeDefined();
    expect(result[0].x1).toBeDefined();
    expect(result[0].features[0].y0).toBeDefined();
    expect(result[0].features[0].y1).toBeDefined();
  });

  test("transformChartData should transform the input data correctly", () => {
    const result = transformChartData(testData);
    expect(result[0].total).toEqual(60);
    expect(result[1].total).toEqual(75);
    expect(result[0].features[0].x0).toBeDefined();
    expect(result[0].features[0].x1).toBeDefined();
    expect(result[0].features[0].y0).toBeDefined();
    expect(result[0].features[0].y1).toBeDefined();
  });

  test("addCommentSpotsToChartData should attach the comment threads correctly", () => {
    const chartData = transformChartData(testData);
    const result = addCommentSpotsToChartData(testCommentThreads, chartData);
    expect(result[0].commentThread).toBeDefined();
    expect(result[1].commentThread).toBeUndefined();
  });
});
