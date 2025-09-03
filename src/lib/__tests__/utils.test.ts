import { formatDate, truncateText, generateId, cn } from "../utils";

describe("Utility Functions", () => {
  describe("formatDate", () => {
    it('returns "Just now" for dates less than 1 hour ago', () => {
      const now = new Date();
      const date = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago

      expect(formatDate(date)).toBe("Just now");
    });

    it("returns hours ago for dates less than 24 hours ago", () => {
      const now = new Date();
      const date = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago

      expect(formatDate(date)).toBe("5h ago");
    });

    it('returns "Yesterday" for dates between 24-48 hours ago', () => {
      const now = new Date();
      const date = new Date(now.getTime() - 25 * 60 * 60 * 1000); // 25 hours ago

      expect(formatDate(date)).toBe("Yesterday");
    });

    it("returns formatted date for dates more than 48 hours ago", () => {
      const date = new Date("2024-01-01");
      const result = formatDate(date);

      expect(result).toMatch(/Jan \d+, 2024/);
    });
  });

  describe("truncateText", () => {
    it("returns original text if shorter than max length", () => {
      const text = "Short text";
      const result = truncateText(text, 20);

      expect(result).toBe(text);
    });

    it("truncates text longer than max length", () => {
      const text = "This is a very long text that should be truncated";
      const result = truncateText(text, 20);

      expect(result).toBe("This is a very long ...");
      expect(result.length).toBe(23); // 20 + '...'
    });

    it("handles empty string", () => {
      const result = truncateText("", 10);

      expect(result).toBe("");
    });

    it("handles max length of 0", () => {
      const text = "Some text";
      const result = truncateText(text, 0);

      expect(result).toBe("...");
    });
  });

  describe("generateId", () => {
    it("generates unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
    });

    it("generates string IDs", () => {
      const id = generateId();

      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
    });

    it("generates IDs with alphanumeric characters", () => {
      const id = generateId();

      expect(id).toMatch(/^[a-z0-9]+$/);
    });
  });

  describe("cn", () => {
    it("merges class names correctly", () => {
      const result = cn("class1", "class2", "class3");

      expect(result).toBe("class1 class2 class3");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");

      expect(result).toBe("base-class active-class");
    });

    it("handles falsy values", () => {
      const isActive = false;
      const result = cn("base-class", isActive && "active-class");

      expect(result).toBe("base-class");
    });

    it("handles empty strings and undefined", () => {
      const result = cn("base-class", "", undefined, null);

      expect(result).toBe("base-class");
    });

    it("handles arrays", () => {
      const result = cn("base-class", ["class1", "class2"]);

      expect(result).toBe("base-class class1 class2");
    });

    it("handles objects", () => {
      const result = cn("base-class", {
        "conditional-class": true,
        "other-class": false,
      });

      expect(result).toBe("base-class conditional-class");
    });
  });
});
