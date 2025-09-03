import { useState, useEffect } from "react";
import { Community } from "../types/community.type";

// Mock data for communities
const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Crypto Life",
    description:
      "A community focused on cryptocurrency lifestyle, trading strategies, and blockchain technology discussions.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    memberCount: "10.6K",
    contentFrequency: "9 contents/week",
    category: "crypto",
    isVerified: true,
    isJoined: false,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "AI4Life - Nâng Tầm Cùng AI",
    description:
      "Vietnamese community exploring artificial intelligence applications in daily life and business.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    memberCount: "6.67K",
    contentFrequency: "7 contents/week",
    category: "ai",
    isVerified: true,
    isJoined: false,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "EVOL Community",
    description:
      "HÀNG KHÁC BIỆT VÀO TƯ DUY - Community for innovative thinking and personal evolution.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    memberCount: "9.14K",
    contentFrequency: "20 contents/week",
    category: "growth",
    isVerified: true,
    isJoined: false,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    name: "BEINCOM GLOBAL",
    description:
      "Official global community for Beincom platform users and enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    memberCount: "41.9K",
    contentFrequency: "6 contents/week",
    category: "community",
    isVerified: true,
    isJoined: true,
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    name: "Comm Builders & Leaders (CBL)",
    description:
      "COMMUNITY BUILDERS & LEADERS - For those who build and lead communities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    memberCount: "1.69K",
    contentFrequency: "3 contents/week",
    category: "community",
    isVerified: false,
    isJoined: false,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    name: "Digital Marketing Is Bigger Than It Seems",
    description:
      "Exploring the vast world of digital marketing strategies and opportunities.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    memberCount: "1.23K",
    contentFrequency: "1 content/week",
    category: "marketing",
    isVerified: false,
    isJoined: false,
    badge: "$5 BIC",
    createdAt: new Date("2024-01-06"),
  },
  {
    id: "7",
    name: "The Growth Mindset",
    description:
      "Developing a growth mindset for personal and professional development.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    memberCount: "897",
    contentFrequency: "1 content/week",
    category: "growth",
    isVerified: false,
    isJoined: false,
    badge: "$5 BIC",
    createdAt: new Date("2024-01-07"),
  },
  {
    id: "8",
    name: "Crypto News Official",
    description:
      "CRYPTOCURRENCY - Latest news and updates from the crypto world.",
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    memberCount: "838",
    contentFrequency: "11 contents/week",
    category: "crypto",
    isVerified: false,
    isJoined: false,
    createdAt: new Date("2024-01-08"),
  },
];

export function useCommunities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCommunities = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCommunities(mockCommunities);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const joinCommunity = async (communityId: string) => {
    setCommunities((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? { ...community, isJoined: !community.isJoined }
          : community
      )
    );
  };

  const leaveCommunity = async (communityId: string) => {
    setCommunities((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? { ...community, isJoined: false }
          : community
      )
    );
  };

  return {
    communities,
    isLoading,
    joinCommunity,
    leaveCommunity,
  };
}
