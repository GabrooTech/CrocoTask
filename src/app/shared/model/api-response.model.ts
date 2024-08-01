export interface CategoryItem {
  type: string;
  category: string;
  group?: string;
  platform?: string;
  name: string;
  active?: boolean;
  games?: Game[];
  order?: number;
}

export interface ApiResponse {
  data: CategoryItem[];
}
export interface Game {
  game_id: string;
  name: string;
  provider: string;
  providerName: string;
  hasLargeImage: boolean;
}