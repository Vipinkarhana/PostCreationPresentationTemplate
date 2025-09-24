export type SlideLayout =
  | "title-content"
  | "two-column"
  | "image-focus"
  | "full-image"
  | "quote"
  | "chart";

export interface SlideContent {
  title?: string;
  text?: string;
  text2?: string;
  quote?: string;
  author?: string;
  imageUrl?: string;
  chartData?: any;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  content?: SlideContent;
  theme?: string;
}

export interface PostType {
  id: string;
  label: string;
  name: string; // Add name property
  icon: string;
  color: string;
  theme: {
    gradient: string;
    accent: string;
    text: string;
  };
  description: string;
  template: string;
}

export interface SlideLayoutOption {
  id: SlideLayout;
  name: string;
  icon: string;
  description: string;
}

export interface BackgroundTheme {
  id: string;
  name: string;
  class: string;
  textColor: string;
}

export interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}