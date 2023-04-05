import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ChartPage from "./chart_page";

describe("ChartPage", () => {
  const queryClient = new QueryClient();

  test("should render ChartPage component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChartPage />
      </QueryClientProvider>
    );

    // Check if header is rendered
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
