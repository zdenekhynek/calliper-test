import queryString from "query-string";
import { TChartDataPoint, TComment } from "./types";

export const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME || "http://localhost:8000";

export function encodeQueryParamsToSearchString(params: {
  [key: string]: string | number;
}) {
  //  remove any empty params
  Object.keys(params).forEach((key) => {
    if (params[key] == null) {
      delete params[key];
    }
  });

  const paramsString = queryString.stringify(params);
  return `?${paramsString}`;
}

export async function fetchApiData(
  path: string,
  params = {},
  fetchOpts: any = {}
) {
  const url = new URL(`${API_HOSTNAME}/${path}`);

  if (!fetchOpts.headers) {
    fetchOpts.headers = {};
  }

  if (params && Object.keys(params).length > 0) {
    if (fetchOpts.method !== "POST") {
      url.search = encodeQueryParamsToSearchString(params);
    } else {
      //  POST requests need params in body
      fetchOpts.body = JSON.stringify(params);
      fetchOpts.headers["Content-Type"] = "application/json";
    }
  }

  const resp = await fetch(url, fetchOpts);

  //  make sure we throw on anything but 2xx responses
  if (!resp.ok) {
    const errorMsg = resp.statusText ? resp.statusText : "Error fetching data";
    throw Error(errorMsg);
  }

  return await resp.json();
}

export async function getChartData() {
  return await fetchApiData("chart/data");
}

export async function getChartCommentThreads() {
  return await fetchApiData("chart/comment_threads");
}

export async function postChartCommentThreads(
  dataPoint: TChartDataPoint,
  comment: TComment
) {
  const { userName: user_name, text } = comment;
  const payload = {
    data_point: dataPoint,
    comment: { user_name, text },
  };

  return await fetchApiData("chart/comment_threads", payload, {
    method: "POST",
  });
}

export async function getChartCommentThreadResponses(commentThreadId: string) {
  return await fetchApiData(`chart/comment_threads/${commentThreadId}`);
}

export async function postChartCommentThreadResponses(
  commentThreadId: string,
  comment: TComment
) {
  const { userName: user_name, text } = comment;
  const payload = {
    comment: {
      user_name,
      text,
    },
  };

  return await fetchApiData(
    `chart/comment_threads/${commentThreadId}/respond`,
    payload,
    { method: "POST" }
  );
}

export async function getShareLink() {
  return await fetchApiData("share");
}

export async function getShareData(shareId: string | undefined) {
  return await fetchApiData(`chart/shared/${shareId}`);
}
