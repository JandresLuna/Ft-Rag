
export type UserRole = 'EXPOSITOR' | 'AUDIENCIA' | null;

export enum ModuleId {
  HERO = 'hero',
  ROLE_SELECTION = 'role-selection',
  CONTEXT = 'context',
  FINE_TUNING = 'fine-tuning',
  RAG = 'rag',
  HYBRID = 'hybrid',
  GAME_DRAG_DROP = 'game-drag-drop',
  GAME_SIMULATOR = 'game-simulator',
  COMPARISON = 'comparison',
  DECISION_TREE = 'decision-tree',
  TAKEAWAYS = 'takeaways'
}

export interface GameScore {
  gameId: string;
  score: number;
  total: number;
  completed: boolean;
}

export interface AppState {
  role: UserRole;
  currentModuleIndex: number;
  scores: Record<string, GameScore>;
}
