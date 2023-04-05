import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import SharePage from "./share_page";

describe("SharePage", () => {
  const queryClient = new QueryClient();

  test("should render SharePage component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
      </QueryClientProvider>
    );

    // Check if header is rendered
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
