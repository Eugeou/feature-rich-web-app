import { User } from "@/types/auth.type";
import { oauthProviders, users } from "@/data";

class AuthService {
  private currentUser: User | null = null;

  async signUp(email: string, password: string, name: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${Math.random()
        .toString(36)
        .substring(7)}?w=150&h=150&fit=crop&crop=face`,
      createdAt: new Date(),
    };

    users.push(newUser);
    this.currentUser = newUser;

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return newUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    this.currentUser = user;

    localStorage.setItem("currentUser", JSON.stringify(user));

    return user;
  }

  async signInWithOAuth(provider: keyof typeof oauthProviders): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomUser = users[Math.floor(Math.random() * users.length)];
    this.currentUser = randomUser;

    localStorage.setItem("currentUser", JSON.stringify(randomUser));

    return randomUser;
  }

  async signOut(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  async getCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }

    return this.currentUser;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error("Not authenticated");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedUser = { ...this.currentUser, ...updates };
    this.currentUser = updatedUser;

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const index = users.findIndex((u) => u.id === this.currentUser!.id);
    if (index !== -1) {
      users[index] = updatedUser;
    }

    return updatedUser;
  }
}

export const authService = new AuthService();
