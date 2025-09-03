import React from "react";
import { render, screen } from "@testing-library/react";
import { PostCard } from "../PostCard";
import { Post } from "@/types/response.type";

const mockPost: Post = {
  id: 1,
  title: "Test Post Title",
  body: "This is a test post body with some content to display.",
  userId: 1,
};

describe("PostCard", () => {
  it("renders post information correctly", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeDefined();
    expect(
      screen.getByText("This is a test post body with some content to display.")
    ).toBeDefined();
    expect(screen.getByText("User 1")).toBeDefined();
    expect(screen.getByText("Community 1")).toBeDefined();
  });

  it("shows post actions when showActions is true", () => {
    render(<PostCard post={mockPost} showActions={true} />);

    expect(screen.getByText("Comment")).toBeDefined();
    expect(screen.getByText("Like")).toBeDefined();
    expect(screen.getByText("Share")).toBeDefined();
    expect(screen.getByText("Read More")).toBeDefined();
  });

  it("hides post actions when showActions is false", () => {
    render(<PostCard post={mockPost} showActions={false} />);

    expect(screen.queryByText("Comment")).not.toBeDefined();
    expect(screen.queryByText("Like")).not.toBeDefined();
    expect(screen.queryByText("Share")).not.toBeDefined();
    expect(screen.queryByText("Read More")).not.toBeDefined();
  });

  it("renders correct user ID with padding", () => {
    const postWithHighUserId: Post = {
      ...mockPost,
      userId: 25,
    };

    render(<PostCard post={postWithHighUserId} />);

    expect(screen.getByText("User 25")).toBeDefined();
    // Check that the avatar shows the padded ID
    expect(screen.getByText("25")).toBeDefined();
  });

  it("has correct link to post detail", () => {
    render(<PostCard post={mockPost} />);

    const readMoreLink = screen.getByRole("link", { name: "Read More" });
    expect(readMoreLink.getAttribute("href")).toBe("/posts/1");
  });

  it("displays post content with proper styling classes", () => {
    render(<PostCard post={mockPost} />);

    const title = screen.getByText("Test Post Title");
    const body = screen.getByText(
      "This is a test post body with some content to display."
    );

    expect(title.className).toContain("text-xl");
    expect(title.className).toContain("font-semibold");
    expect(title.className).toContain("text-gray-900");
    expect(body.className).toContain("text-gray-700");
    expect(body.className).toContain("leading-relaxed");
  });
});
