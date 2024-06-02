import { Article, Keyword } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchNytimesApi(
  query: string,
  from: string,
  to: string,
  setLoadingNYTimesNews: (isLoading: boolean) => void
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&page=0&sort=newest&begin_date=${from}&end_date=${to}`;

  if (query) url += `&q=${query}`;

  const customFeed = localStorage.getItem("customField");
  let parsedCustomFeed = {
    sources: "",
    categories: "",
    authors: "",
  };
  if (customFeed) parsedCustomFeed = JSON.parse(customFeed);

  let fqParams = [];

  if (parsedCustomFeed.sources) {
    const sources = parsedCustomFeed.sources
      .split(",")
      .map((source) => `source:("${source.trim()}")`)
      .join(" OR ");
    fqParams.push(`(${sources})`);
  }

  if (parsedCustomFeed.categories) {
    const categories = parsedCustomFeed.categories
      .split(",")
      .map((category) => `news_desk:("${category.trim()}")`)
      .join(" OR ");
    fqParams.push(`(${categories})`);
  }

  if (parsedCustomFeed.authors) {
    const authors = parsedCustomFeed.authors
      .split(",")
      .map((author) => `byline:("${author.trim()}")`)
      .join(" OR ");
    fqParams.push(`(${authors})`);
  }

  if (fqParams.length > 0) {
    url += `&fq=${fqParams.join(" OR ")}`;
  }

  setLoadingNYTimesNews(true);
  const response = await fetch(url);
  const data = await response.json();
  setLoadingNYTimesNews(false);

  return data.response.docs.map((article: any) =>
    createArticle({
      title: article.headline.main,
      url: article.web_url,
      source: article.source,
      category: article.keywords.map((k: Keyword) => k.value) || "all",
      date: article.pub_date,
      author: article.byline?.original || "Unknown Author",
      keywords: article.keywords.map((k: Keyword) => k.value),
      image: article?.multimedia[0]?.url,
      body: article.snippet,
    })
  );
}
