import { render, screen } from "@testing-library/react";
import { TCountry, TChartDataFeature } from "../types";
import CountryBar from "./country_bar";

describe("CountryBar", () => {
  test("should render CountryBar component correctly", () => {
    const country = "DE" as TCountry;
    const props = {
      country,
      x0: 10,
      x1: 210,
      total: 100,
      features: [
        {
          country,
          name: "burger" as TChartDataFeature,
          value: 30,
          x0: 10,
          x1: 110,
          y0: 200,
          y1: 140,
          backgroundColor: "red",
        },
        {
          country,
          name: "hotdog" as TChartDataFeature,
          value: 20,
          x0: 110,
          x1: 210,
          y0: 200,
          y1: 160,
          backgroundColor: "blue",
        },
      ],
    };

    render(<CountryBar {...props} />);

    // Check if the country label is rendered
    const countryLabelElement = screen.getByText(props.country);
    expect(countryLabelElement).toBeInTheDocument();

    // Check if the FoodBar components are rendered
    const burgerEmojiElement = screen.getByText("🍔");
    expect(burgerEmojiElement).toBeInTheDocument();

    const hotdogEmojiElement = screen.getByText("🌭");
    expect(hotdogEmojiElement).toBeInTheDocument();
  });
});
