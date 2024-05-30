import { AiCategory, Article } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchAiNewsApi(
  query: string,
  from: string,
  to: string
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_AI_NEWS_API_KEY;
  let url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=${apiKey}&lang=eng&articlesCount=10`;
  if (query) url += `&keyword=${query}`;
  if (from || to) url += `&from=${from}&to=${to}`;

  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();

  return data.articles.results.map(
    (article: any) =>
      article &&
      createArticle({
        title: article.title,
        url: article.url,
        source: article.source.uri.split(".")[0],
        category: article?.concepts?.map(
          (category: AiCategory) => category.label.eng
        ),
        date: article.dateTime,
        author:
          article.authors.length > 0 ? article.authors[0].name : "No Author",
        keywords: article?.concepts?.map(
          (category: AiCategory) => category.label.eng
        ),
        image: article.image,
        body: article.body,
      })
  );
}
