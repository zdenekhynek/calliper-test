import { render, screen } from "@testing-library/react";
import CommentThreadPreview from "./comment_thread_preview";
import { TCommentThreadResponse, TComment } from "../types";

describe("CommentThreadPreview", () => {
  test("should render comment thread preview correctly", () => {
    const comments: TComment[] = [
      {
        userName: "TestUser1",
        text: "This is a test comment 1",
      },
      {
        userName: "TestUser2",
        text: "This is a test comment 2",
      },
    ];

    const commentThread: TCommentThreadResponse = {
      id: "thread-id",
      chartDataPoint: { feature: "burger", country: "FR" },
      commentsCount: comments.length,
      comments,
    };

    render(<CommentThreadPreview {...commentThread} />);

    // Check if the first comment is rendered
    const firstCommentUsernameElement = screen.getByText(
      comments[0].userName + ":"
    );
    const firstCommentTextElement = screen.getByText(comments[0].text);

    expect(firstCommentUsernameElement).toBeInTheDocument();
    expect(firstCommentTextElement).toBeInTheDocument();

    // Check if the number of replies is rendered correctly
    const numRepliesElement = screen.getByText("1 reply");
    expect(numRepliesElement).toBeInTheDocument();
  });
});
