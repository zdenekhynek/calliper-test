import { render, screen } from "@testing-library/react";
import CommentThreadDetail, {
  ICommentThreadDetailProps,
} from "./comment_thread_detail";
import { TComment } from "../types";

describe("CommentThreadDetail", () => {
  test("should render comment thread correctly", () => {
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
    const handleReplyMock = jest.fn();

    const commentThread: ICommentThreadDetailProps = {
      id: "thread-id",
      chartDataPoint: { feature: "burger", country: "FR" },
      commentsCount: 0,
      comments,
      onReply: handleReplyMock,
    };

    render(<CommentThreadDetail {...commentThread} />);

    comments.forEach((comment) => {
      const usernameElement = screen.getByText(comment.userName + ":");
      const textElement = screen.getByText(comment.text);

      expect(usernameElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();
    });

    const replyElement = screen.getByPlaceholderText("Reply...");
    expect(replyElement).toBeInTheDocument();
  });
});
