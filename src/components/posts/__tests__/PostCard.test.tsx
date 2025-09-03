import React from "react";
import { render, screen } from "@testing-library/react";
import { PostCard } from "../PostCard";
import { Post } from "@/lib/api";

const mockPost: Post = {
  id: 1,
  title: "Test Post Title",
  body: "This is a test post body with some content to display.",
  userId: 1,
};

describe("PostCard", () => {
  it("renders post information correctly", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test post body with some content to display.")
    ).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("Community 1")).toBeInTheDocument();
  });

  it("shows post actions when showActions is true", () => {
    render(<PostCard post={mockPost} showActions={true} />);

    expect(screen.getByText("Comment")).toBeInTheDocument();
    expect(screen.getByText("Like")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("hides post actions when showActions is false", () => {
    render(<PostCard post={mockPost} showActions={false} />);

    expect(screen.queryByText("Comment")).not.toBeInTheDocument();
    expect(screen.queryByText("Like")).not.toBeInTheDocument();
    expect(screen.queryByText("Share")).not.toBeInTheDocument();
    expect(screen.queryByText("Read More")).not.toBeInTheDocument();
  });

  it("renders correct user ID with padding", () => {
    const postWithHighUserId: Post = {
      ...mockPost,
      userId: 25,
    };

    render(<PostCard post={postWithHighUserId} />);

    expect(screen.getByText("User 25")).toBeInTheDocument();
    // Check that the avatar shows the padded ID
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("has correct link to post detail", () => {
    render(<PostCard post={mockPost} />);

    const readMoreLink = screen.getByRole("link", { name: "Read More" });
    expect(readMoreLink).toHaveAttribute("href", "/posts/1");
  });

  it("displays post content with proper styling classes", () => {
    render(<PostCard post={mockPost} />);

    const title = screen.getByText("Test Post Title");
    const body = screen.getByText(
      "This is a test post body with some content to display."
    );

    expect(title).toHaveClass("text-xl", "font-semibold", "text-gray-900");
    expect(body).toHaveClass("text-gray-700", "leading-relaxed");
  });
});
