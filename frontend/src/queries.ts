import { useQuery } from "react-query";

import {
  getChartCommentThreads,
  getChartData,
  getChartCommentThreadResponses,
} from "./fetch_data";
import { TCommentThreadsResponse, TChartCountryFeatures } from "./types";

export function useChartDataQuery() {
  return useQuery<TChartCountryFeatures[]>({
    retry: 0,
    queryKey: ["chart"],
    queryFn: async () => {
      return getChartData();
    },
  });
}

export function useChartCommentThreadsQuery() {
  return useQuery<TCommentThreadsResponse>({
    retry: 0,
    queryKey: ["commentThreads"],
    queryFn: async () => {
      return getChartCommentThreads();
    },
  });
}

export function useChartCommentThreadResponsesQuery(
  id: string,
  shouldLoadData: boolean
) {
  return useQuery({
    retry: 0,
    queryKey: [id],
    enabled: shouldLoadData,
    queryFn: async () => {
      return getChartCommentThreadResponses(id);
    },
  });
}
