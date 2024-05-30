export interface Article {
  title: string;
  url: string;
  source: string;
  category: string | [];
  date: Date;
  author: string;
  keywords: string[] | null;
  image?: string;
  body: string;
}

export type Keyword = {
  name: string;
  value: string;
  rank: string;
  major: string;
};

export type AiCategory = {
  uri: string;
  type: string;
  score: number;
  label: { eng: string };
};

export interface MainContextType {
  search: string;
  setSearch: (value: string) => void;
  clickSearch: boolean;
  setClickSearch: (value: boolean) => void;
}