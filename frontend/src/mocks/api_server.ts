import { rest } from "msw";
import { setupServer } from "msw/node";

import { API_HOSTNAME } from "../fetch_data";
import chartData from "./chart_data.json";

export const CHART_DATA_ENDPOINT = `${API_HOSTNAME}/chart/data`;
export const SHARE_DATA_ENDPOINT = `${API_HOSTNAME}/chart/shared/abc`;
export const COMMENT_THREADS_ENDPOINT = `${API_HOSTNAME}/chart/comment_threads`;

export const handlers = [
  rest.get(CHART_DATA_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(chartData));
  }),
  rest.get(COMMENT_THREADS_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          chartDataPoint: {
            feature: "kebab",
            country: "DE",
          },
          commentsCount: 3,
          id: "05ea2cb2717d414393fa30b36609c118",
        },
        {
          chartDataPoint: {
            feature: "burger",
            country: "GB",
          },
          commentsCount: 2,
          id: "4a905c4edd684130b8b57886fdacf20a",
        },
      ])
    );
  }),
  rest.get(SHARE_DATA_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(chartData));
  }),
];

export default setupServer(...handlers);
