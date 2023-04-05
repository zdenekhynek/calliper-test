import { render, screen } from "@testing-library/react";
import { TCountry, TChartDataFeature } from "../types";
import BarChart from "./bar_chart";

describe("BarChart", () => {
  test("should render BarChart component correctly", () => {
    const country1 = "DE" as TCountry;
    const country2 = "BE" as TCountry;
    const data = [
      {
        country: country1,
        x0: 0,
        x1: 100,
        total: 100,
        features: [
          {
            country: country1,
            name: "burger" as TChartDataFeature,
            value: 30,
            x0: 0,
            x1: 30,
            y0: 200,
            y1: 140,
            backgroundColor: "red",
          },
        ],
      },
      {
        country: country2,
        x0: 100,
        x1: 200,
        total: 50,
        features: [
          {
            country: country2,
            name: "hotdog" as TChartDataFeature,
            value: 20,
            x0: 100,
            x1: 120,
            y0: 200,
            y1: 160,
            backgroundColor: "blue",
          },
        ],
      },
    ];

    render(<BarChart data={data} />);

    // Check if the CountryBar components are rendered
    const usaLabelElement = screen.getByText("DE");
    expect(usaLabelElement).toBeInTheDocument();

    const canadaLabelElement = screen.getByText("BE");
    expect(canadaLabelElement).toBeInTheDocument();

    // Check if the FoodBar components are rendered
    const burgerEmojiElement = screen.getByText("🍔");
    expect(burgerEmojiElement).toBeInTheDocument();

    const hotdogEmojiElement = screen.getByText("🌭");
    expect(hotdogEmojiElement).toBeInTheDocument();
  });
});
