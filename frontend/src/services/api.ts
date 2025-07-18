const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: string;
  team_id?: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginRequest {
  username: string; // email
  password: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  role?: string;
  team_id?: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
  status_code: number;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async signup(userData: SignupRequest): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async logout(): Promise<void> {
    this.removeToken();
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/refresh', {
      method: 'POST',
    });
    this.setToken(response.access_token);
    return response;
  }

  // Token management
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Match methods
  async getMatches(): Promise<any[]> {
    return this.request<any[]>('/matches');
  }

  async createMatch(matchData: any): Promise<any> {
    return this.request<any>('/matches', {
      method: 'POST',
      body: JSON.stringify(matchData),
    });
  }

  async getMatch(matchId: number): Promise<any> {
    return this.request<any>(`/matches/${matchId}`);
  }

  // Team methods
  async getTeams(): Promise<any[]> {
    return this.request<any[]>('/teams');
  }

  async createTeam(teamData: any): Promise<any> {
    return this.request<any>('/teams', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  // Player methods
  async getPlayers(): Promise<any[]> {
    return this.request<any[]>('/players');
  }

  async createPlayer(playerData: any): Promise<any> {
    return this.request<any>('/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
    });
  }

  // Analysis methods
  async getMatchAnalysis(matchId: number): Promise<any> {
    return this.request<any>(`/analysis/match/${matchId}`);
  }

  async getTeamPerformance(teamId: number): Promise<any> {
    return this.request<any>(`/analysis/team/${teamId}/performance`);
  }

  async getPlayerStats(playerId: number): Promise<any> {
    return this.request<any>(`/analysis/player/${playerId}/stats`);
  }

  // AI Assistant methods
  async getAIRecommendations(matchContext: any): Promise<any> {
    return this.request<any>('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify(matchContext),
    });
  }

  async predictMatchOutcome(matchData: any): Promise<any> {
    return this.request<any>('/ai/match-prediction', {
      method: 'POST',
      body: JSON.stringify(matchData),
    });
  }

  async analyzeOpponent(opponentData: any): Promise<any> {
    return this.request<any>('/ai/opponent-analysis', {
      method: 'POST',
      body: JSON.stringify(opponentData),
    });
  }

  async getTrainingSuggestions(teamData: any): Promise<any> {
    return this.request<any>('/ai/training-suggestions', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }
}

export const apiService = new ApiService(); 