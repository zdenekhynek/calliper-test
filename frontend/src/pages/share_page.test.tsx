import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import Router from "react-router-dom";

import server, { CHART_DATA_ENDPOINT } from "../mocks/api_server";
import SharePage from "./share_page";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const queryClient = new QueryClient();

const renderSharePage = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SharePage />
    </QueryClientProvider>
  );
};

describe("SharePage", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ shareId: "abc" });
  });

  test("renders Loader when loading data", async () => {
    server.use(
      rest.get("/share/data", (req, res, ctx) => {
        return res(ctx.delay(2000));
      })
    );

    renderSharePage();

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  test("renders the page once loaded", async () => {
    // mockedUseParams.mockReturnValue({ shareId: "abc" });

    renderSharePage();

    await screen.findByTestId("share-page");

    expect(screen.getAllByTestId("food-bar")).toHaveLength(36);
  });

  test("renders Error component when there is an error", async () => {
    jest
      .spyOn(Router, "useParams")
      .mockReturnValue({ shareId: "non-existing" });

    server.use(
      rest.get(CHART_DATA_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderSharePage();

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });
});
