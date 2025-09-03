// Fake authentication system for demo purposes
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

// Simulate user database
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-03'),
  },
];

// Simulate OAuth providers
export const oauthProviders = {
  google: {
    name: 'Google',
    icon: '🔍',
    color: '#4285F4',
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
  },
  twitter: {
    name: 'Twitter',
    icon: '🐦',
    color: '#1DA1F2',
  },
};

class AuthService {
  private currentUser: User | null = null;

  async signUp(email: string, password: string, name: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=150&h=150&fit=crop&crop=face`,
      createdAt: new Date(),
    };

    users.push(newUser);
    this.currentUser = newUser;
    
    // Store in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd verify the password
    // For demo, we'll just check if the email exists
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.currentUser = user;
    
    // Store in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  }

  async signInWithOAuth(provider: keyof typeof oauthProviders): Promise<User> {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, we'll create a random user or use existing one
    const randomUser = users[Math.floor(Math.random() * users.length)];
    this.currentUser = randomUser;
    
    // Store in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(randomUser));
    
    return randomUser;
  }

  async signOut(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  async getCurrentUser(): Promise<User | null> {
    // Check localStorage first
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
    
    return this.currentUser;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...this.currentUser, ...updates };
    this.currentUser = updatedUser;
    
    // Update in localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const index = users.findIndex(u => u.id === this.currentUser!.id);
    if (index !== -1) {
      users[index] = updatedUser;
    }
    
    return updatedUser;
  }
}

export const authService = new AuthService();
