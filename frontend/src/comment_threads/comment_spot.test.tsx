import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentSpot from "./comment_spot";
import { TChartDataFeature, TCountry } from "../types";

describe("CommentSpot", () => {
  test("should open and submit reply", () => {
    const feature: TChartDataFeature = "hotdog";
    //{ id: 1, name: "Feature 1" };
    const country: TCountry = "FR";
    const handleReplyMock = jest.fn();

    render(
      <CommentSpot
        feature={feature}
        country={country}
        onReply={handleReplyMock}
      />
    );

    const commentSpot = screen.getByRole("button", { name: "" });

    // Click the comment spot to open
    fireEvent.click(commentSpot);

    const textarea = screen.getByTestId("reply-textarea");
    const submitButton = screen.getByTestId("reply-submit-btn");

    // Enter text in the textarea
    userEvent.type(textarea, "This is a test comment");

    // Check if the textarea value is updated
    expect(textarea).toHaveValue("This is a test comment");

    // Click the submit button
    fireEvent.click(submitButton);

    // Check if the textarea is cleared
    expect(textarea).toHaveValue("");

    // Check if the onReply function is called with the correct values
    expect(handleReplyMock).toHaveBeenCalledTimes(1);
    expect(handleReplyMock).toHaveBeenCalledWith(
      feature,
      country,
      "This is a test comment"
    );
  });
});
