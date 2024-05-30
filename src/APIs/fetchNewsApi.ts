import { Article } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchNewsApi(
  query: string,
  from: string,
  to: string
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NEWS_API_ORG_KEY;
  let url = `https://newsapi.org/v2/everything?language=en&pageSize=10&apiKey=${apiKey}`;
  if (query) url += `&q=${query}`;
  if (from || to) url += `&from=${from}&to=${to}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.articles.map(
    (article: any) =>
      article.source.name !== "[Removed]" &&
      createArticle({
        title: article.title,
        url: article.url,
        source: article.source.name,
        category: "all",
        date: article.publishedAt,
        author: article.author,
        keywords: [],
        image: article.urlToImage,
        body: article.description,
      })
  );
}
