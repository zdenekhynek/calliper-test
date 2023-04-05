import { scaleLinear, scaleBand, ScaleBand, ScaleLinear } from "d3-scale";

import {
  TChartCountryFeatures,
  TChartCountryData,
  TChartDataFeature,
  TFoodBarData,
  TBarChartData,
  TCommentThreadsResponse,
  TCommentThread,
} from "./types";

export function addFeatureTotals(
  data: TChartCountryFeatures[]
): TChartCountryData[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((d) => {
    const features: any[] = [];
    const { country } = d;

    const featureKeys = Object.keys(d).filter(
      (k) => k !== "country"
    ) as TChartDataFeature[];

    const total = featureKeys.reduce(
      (acc: number, featureKey: TChartDataFeature) => {
        const value = d[featureKey];
        if (value) {
          features.push({ name: featureKey, value });
          return (acc += value);
        }

        return acc;
      },
      0
    );

    return { country, features, total };
  });
}

export function extendFeaturesWithScales(
  data: TChartCountryData[],
  xScale: ScaleBand<string>,
  yScale: ScaleLinear<number, number, never>,
  colorScale: ScaleLinear<string, string, never>
) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((d) => {
    let currY = 500;

    const { country } = d;
    const x0 = xScale(country) || 0;
    const x1 = x0 + xScale.bandwidth();

    const features: TFoodBarData[] = d.features.map((f, i: number) => {
      const y0 = currY;
      const y1 = y0 - yScale(f.value);
      currY = y1;

      const backgroundColor = colorScale(i);
      return { ...f, country, x0, x1, y0, y1, backgroundColor };
    });

    return { ...d, x0, x1, features };
  });
}

export function transformChartData(data: TChartCountryFeatures[] = []) {
  if (!Array.isArray(data)) {
    return [];
  }

  const dataWithTotals = addFeatureTotals(data);
  const totals = dataWithTotals.map((d) => d.total);
  const maxTotals = Math.max(...totals);

  const xScale = scaleBand()
    .domain(dataWithTotals.map((d) => d.country))
    .range([0, 800])
    .paddingInner(0.25)
    .paddingOuter(0.25)
    .align(0.5)
    .round(true);
  const yScale = scaleLinear().domain([0, maxTotals]).range([0, 500]);
  const colorScale = scaleLinear<string>()
    .domain([0, 5])
    .range(["#fba204", "#1b186c", "#b9afd5", "#5a2a53"]);

  return extendFeaturesWithScales(dataWithTotals, xScale, yScale, colorScale);
}

export function addCommentSpotsToChartData(
  commentThreads: TCommentThreadsResponse,
  chartData: TBarChartData
) {
  if (!Array.isArray(commentThreads) || !Array.isArray(chartData)) {
    return [];
  }

  const commentThreadLookup = commentThreads.reduce<{
    [key: string]: TCommentThread;
  }>((acc, commentThread: TCommentThread) => {
    const key = `${commentThread.chartDataPoint.country}-${commentThread.chartDataPoint.feature}`;
    acc[key] = commentThread;
    return acc;
  }, {});

  //  add comment threads
  const chartDataWithComments = chartData.map((d) => {
    const features = d.features.map((f) => {
      //  attach comment thread
      const key = `${d.country}-${f.name}`;
      const commentThread = commentThreadLookup[key];
      return { ...f, commentThread };
    });

    return {
      ...d,
      features,
    };
  });

  return chartDataWithComments.reduce<TFoodBarData[]>((acc, d) => {
    return acc.concat(d.features);
  }, []);
}
