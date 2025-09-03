import { Post, Comment, User } from "@/types/response.type";

class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Posts
  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const posts = await this.request<Post[]>(`/posts?_start=${start}&_limit=${limit}`);
    return posts;
  }

  async getPost(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`);
  }

  async searchPosts(query: string, page: number = 1, limit: number = 10): Promise<Post[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const allPosts = await this.request<Post[]>('/posts');
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredPosts.slice(start, end);
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    return this.request<Post[]>(`/posts?userId=${userId}`);
  }

  // Comments
  async getComments(postId: number): Promise<Comment[]> {
    return this.request<Comment[]>(`/posts/${postId}/comments`);
  }

  async addComment(postId: number, comment: Omit<Comment, 'id'>): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Date.now(),
    };
    
    return newComment;
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  // Utility methods
  async getTotalPosts(): Promise<number> {
    const posts = await this.request<Post[]>('/posts');
    return posts.length;
  }

  async getPostsWithPagination(page: number = 1, limit: number = 10, sortBy?: 'title' | 'id', sortOrder: 'asc' | 'desc' = 'asc'): Promise<{
    posts: Post[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const start = (page - 1) * limit;
    //const end = start + limit;
    
    let posts = await this.request<Post[]>(`/posts?_start=${start}&_limit=${limit}`);
    
    if (sortBy) {
      posts = posts.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    const total = await this.getTotalPosts();
    const totalPages = Math.ceil(total / limit);
    
    return {
      posts,
      total,
      totalPages,
      currentPage: page,
    };
  }
}

export const apiService = new ApiService();
