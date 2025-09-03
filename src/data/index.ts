import { User } from "@/types/auth.type";

export const categories = [
  { value: "all", label: "All categories" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "growth", label: "Personal Growth" },
  { value: "community", label: "Community Building" },
];

export const communities = [
  {
    id: "1",
    name: "BIC Beincom Việt Nam",
    logo: "BIC",
    isVerified: true,
    hasNFT: true,
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "123Abc",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "123Abc",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    password: "123Abc",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-03"),
  },
];

export const oauthProviders = {
  google: {
    name: "Google",
    icon: "🔍",
    color: "#4285F4",
  },
  facebook: {
    name: "Facebook",
    icon: "📘",
    color: "#1877F2",
  },
  twitter: {
    name: "Twitter",
    icon: "🐦",
    color: "#1DA1F2",
  },
};
