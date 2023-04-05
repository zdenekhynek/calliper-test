import { render, screen } from "@testing-library/react";
import { TCountry, TChartDataFeature } from "../types";
import FoodBar, { getEmojiForName } from "./food_bar";

describe("FoodBar", () => {
  test("should render FoodBar component correctly", () => {
    const props = {
      country: "BE" as TCountry,
      name: "burger" as TChartDataFeature,
      value: 30,
      x0: 10,
      x1: 110,
      y0: 200,
      y1: 140,
      backgroundColor: "red",
    };

    render(<FoodBar {...props} />);

    // Check if the emoji is rendered
    const emojiElement = screen.getByText("🍔");
    expect(emojiElement).toBeInTheDocument();

    // Check if the value is rendered
    const valueElement = screen.getByText(props.value.toString());
    expect(valueElement).toBeInTheDocument();
  });

  test("should return correct emoji for food name", () => {
    expect(getEmojiForName("hotdog")).toBe("🌭");
    expect(getEmojiForName("burger")).toBe("🍔");
  });
});
