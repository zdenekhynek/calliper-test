import { render, screen } from "@testing-library/react";
import CommentThreadComment from "./comment_thread_comment";
import { TComment } from "../types";

describe("CommentThreadComment", () => {
  test("should render comment correctly", () => {
    const comment: TComment = {
      userName: "TestUser",
      text: "This is a test comment",
    };

    render(<CommentThreadComment {...comment} />);

    const usernameElement = screen.getByText(comment.userName + ":");
    const textElement = screen.getByText(comment.text);

    expect(usernameElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
