import { Dispatch, SetStateAction } from "react";

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

export type Settings = {
  sources: string | null;
  categories: string | null;
  authors: string | null;
};

export interface MainContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  clickSearch: boolean;
  setClickSearch: Dispatch<SetStateAction<boolean>>;
  activeSearch: boolean;
  setActiveSearch: Dispatch<SetStateAction<boolean>>;
  searchResults: Article[];
  setSearchResults: Dispatch<SetStateAction<Article[]>>;
  categoriesFilter: string[];
  setCategoriesFilter: Dispatch<SetStateAction<string[]>>;
  sourcesFilter: string[];
  setSourcesFilter: Dispatch<SetStateAction<string[]>>;
  showCustomize: boolean;
  setShowCustomize: Dispatch<SetStateAction<boolean>>;
  loadingOrgNews: boolean;
  setLoadingOrgNews: Dispatch<SetStateAction<boolean>>;
  loadingAiNews: boolean;
  setLoadingAiNews: Dispatch<SetStateAction<boolean>>;
  loadingNYTimesNews: boolean;
  setLoadingNYTimesNews: Dispatch<SetStateAction<boolean>>;
}
