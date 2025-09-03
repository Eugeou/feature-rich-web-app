import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService, Comment } from "@/lib/api";

export function usePosts(
  page: number = 1,
  limit: number = 10,
  sortBy?: "title" | "id",
  sortOrder: "asc" | "desc" = "asc"
) {
  return useQuery({
    queryKey: ["posts", page, limit, sortBy, sortOrder],
    queryFn: () =>
      apiService.getPostsWithPagination(page, limit, sortBy, sortOrder),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
  });
}

export function useSearchPosts(
  query: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ["search", query, page, limit],
    queryFn: () => apiService.searchPosts(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  });
}

export function useComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => apiService.getComments(postId),
    enabled: !!postId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      comment,
    }: {
      postId: number;
      comment: Omit<Comment, "id">;
    }) => apiService.addComment(postId, comment),
    onSuccess: (_, { postId }) => {
      // Invalidate comments for the specific post
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiService.getUsers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiService.getUser(id),
    enabled: !!id,
  });
}
