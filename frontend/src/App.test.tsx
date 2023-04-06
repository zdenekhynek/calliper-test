import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const queryClient = new QueryClient();

const renderApp = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

describe("App", () => {
  test("renders the ChartPage by default", async () => {
    renderApp();
    expect(await screen.findByTestId("chart-page")).toBeInTheDocument();
  });

  test("renders the SharePage when navigating to /share/:shareId", async () => {
    window.history.pushState({}, "SharePage test", "/share/abc");

    renderApp();

    expect(await screen.findByTestId("share-page")).toBeInTheDocument();
  });
});
