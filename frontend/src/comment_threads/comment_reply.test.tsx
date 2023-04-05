import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentReply from "./comment_reply";

describe("CommentReply", () => {
  test("should submit reply and clear textarea", () => {
    const handleReplyMock = jest.fn();

    render(<CommentReply onReply={handleReplyMock} />);

    const textarea = screen.getByTestId("reply-textarea");
    const submitButton = screen.getByTestId("reply-submit-btn");

    // Enter text in the textarea
    userEvent.type(textarea, "This is a test reply");

    // Check if the textarea value is updated
    expect(textarea).toHaveValue("This is a test reply");

    // Click the submit button
    fireEvent.click(submitButton);

    // Check if the textarea is cleared
    expect(textarea).toHaveValue("");

    // Check if the onReply function is called with the correct value
    expect(handleReplyMock).toHaveBeenCalledTimes(1);
    expect(handleReplyMock).toHaveBeenCalledWith("This is a test reply");
  });
});
