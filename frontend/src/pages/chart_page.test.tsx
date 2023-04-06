import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";

import server, { CHART_DATA_ENDPOINT } from "../mocks/api_server";

import ChartPage from "./chart_page";

const queryClient = new QueryClient();

const renderChartPage = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ChartPage />
    </QueryClientProvider>
  );
};

describe("ChartPage", () => {
  test("renders Loader when loading data", async () => {
    server.use(
      rest.get("/api/chart_data", (req, res, ctx) => {
        return res(ctx.delay(2000));
      }),
      rest.get("/api/comment_threads", (req, res, ctx) => {
        return res(ctx.delay(2000));
      })
    );

    renderChartPage();

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  test("renders the page once loaded", async () => {
    renderChartPage();

    await screen.findByTestId("chart-page");

    const username = screen.getByText(/Hey/i);
    expect(username).toBeInTheDocument();

    expect(screen.getAllByTestId("comments-spot")).toHaveLength(36);
  });

  test("renders Error component when there is an error", async () => {
    server.use(
      rest.get(CHART_DATA_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderChartPage();

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });
});
