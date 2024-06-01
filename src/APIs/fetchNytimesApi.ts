import { Article, Keyword } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchNytimesApi(
  query: string,
  from: string,
  to: string,
  setIsLoading: (isLoaidng: boolean) => void
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&page=0&sort=newest&begin_date=${from}&end_date=${to}`;
  if (query) url += `&q=${query}`;

  setIsLoading(true);
  const response = await fetch(url);
  const data = await response.json();
  setIsLoading(false);

  return data.response.docs.map((article: any) =>
    createArticle({
      title: article.headline.main,
      url: article.web_url,
      source: article.source,
      category: article.keywords.map((k: Keyword) => k.value) || 'all',
      date: article.pub_date,
      author: article.byline.original,
      keywords: article.keywords.map((k: Keyword) => k.value),
      image: article?.multimedia[0]?.url,
      body: article.snippet,
    })
  );
}
