export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
  }
  
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }