export type TChartDataFeature =
  | "hotdog"
  | "burger"
  | "sandwitch"
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
  chartDataPoint: TChartDataPoint[];
};

export type TComment = {
  userName: string;
  text: string;
};

export type TChartDataResponse = {
  country: TCountry;
} & {
  [key in TChartDataFeature]: number;
}[];

export type TCommentThreadsResponse = TCommentThread[];

export type TCommentThreadResponse = TCommentThread & {
  comments: TComment[];
};

export type TCreateThreadRequest = {
  comment: TComment;
  data_point: TChartDataPoint;
};
