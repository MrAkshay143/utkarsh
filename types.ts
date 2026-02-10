export enum SlideType {
  COVER,
  TWO_COLUMN,
  PROCESS,
  METRIC_CHART,
  TABLE_CHART,
  BULLET_SUMMARY,
  CONCLUSION,
  DASHBOARD_TABLE,
  TARGET_DASHBOARD,
  ORG_CHART
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  type: SlideType;
  content: any; // Flexible content structure based on type
  prompt: string; // The AI image generation prompt
  hiddenFields?: Record<string, boolean>; // Track which fields are hidden from presentation
}

export interface GeneratedImage {
  slideId: number;
  base64: string;
  timestamp: number;
}
