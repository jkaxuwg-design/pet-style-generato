export enum AppState {
  UPLOAD = 'UPLOAD',
  CONFIGURE = 'CONFIGURE',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface StyleOption {
  id: string;
  name: string;
  name_zh: string;
  description: string;
  description_zh: string;
  promptModifier: string;
  previewColor: string; // Tailwind class
  icon: string;
}

export interface GenerationSettings {
  styleStrength: number; // 1-100
  preserveColor: boolean;
  dreamyBackground: boolean;
}

export interface GeneratedImage {
  original: string; // base64
  stylized: string; // base64
  styleId: string;
  timestamp: number;
}