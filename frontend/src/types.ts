export type TChartDataFeature =
  | "hotdog"
  | "burger"
  | "sandwich"
  | "kebab"
  | "fries"
  | "donut";

export type TCountry = "FR" | "GB" | "BE" | "DE" | "ES" | "IT";

export type TChartDataPoint = {
  feature: TChartDataFeature;
  country: TCountry;
};

export type TCommentThread = {
  id: string;
  commentsCount: number;
  chartDataPoint: TChartDataPoint;
};

export type TComment = {
  userName: string;
  text: string;
};

export type TCommentThreadsResponse = TCommentThread[];

export type TCommentThreadResponse = TCommentThread & {
  comments: TComment[];
};

export type TCreateThreadRequest = {
  comment: TComment;
  data_point: TChartDataPoint;
};

export type TChartCountryFeature = {
  name: TChartDataFeature;
  value: number;
};

export type TChartCountryFeatures = {
  country: TCountry;
} & {
  [key in TChartDataFeature]?: number;
};

export type TChartCountryData = {
  country: TCountry;
  features: TChartCountryFeature[];
  total: number;
};

export type TFoodBarData = {
  country: TCountry;
  name: TChartDataFeature;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  backgroundColor: string;
  commentThread?: TCommentThread;
};

export type TCountryBarData = {
  country: TCountry;
  features: TFoodBarData[];
  x0: number;
  x1: number;
  total: number;
};

export type TBarChartData = TCountryBarData[];
