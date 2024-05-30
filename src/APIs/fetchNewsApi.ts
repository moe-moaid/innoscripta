import { Article } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchNewsApi(
  query: string,
  // from: string,
  // to: string,
  // page: number,
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NEWS_API_ORG_KEY;
  let url = `https://newsapi.org/v2/everything?language=en&apiKey=${apiKey}&sortBy=publishedAt`;

  if (query) {
    const keywords = query.split(',').map(keyword => keyword.trim());
    const encodedKeywords = keywords.join(' OR ');
    url += `&q=${encodeURIComponent(encodedKeywords)}&searchIn=title`;
  } 

  // if (from) url += `&from=${from}`;
  // if (to) url += `&to=${to}`;

  const response = await fetch(url);
  const data = await response.json();
  

  if (!data.articles) {
    throw new Error('No articles found');
  }

  return data.articles.map((article: any) =>
    createArticle({
      title: article.title,
      url: article.url,
      source: article.source.name,
      category: "all",
      date: new Date(article.publishedAt),
      author: article.author,
      keywords: [],
      image: article.urlToImage,
      body: article.description,
    })
  );
}

