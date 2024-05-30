import { Article, Keyword } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchNytimesApi(
  query: string,
  from: string,
  to: string
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
  let url = `https://api.nytimes.com/svc/archive/v1/2024/5.json?api-key=${apiKey}`;
  if (query) url += `&q=${query}`;
  if (from || to) url += `&begin_date=${from}&end_date=${to}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.response.docs.map((article: any) =>
    createArticle({
      title: article.headline.main,
      url: article.web_url,
      source: article.source,
      category: article.keywords.map((k: Keyword) => k.value),
      date: article.pub_date,
      author: article.byline.original,
      keywords: article.keywords.map((k: Keyword) => k.value),
      image: article?.multimedia[0]?.url,
      body: article.snippet,
    })
  );
}
