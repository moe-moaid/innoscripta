import { Article } from "../../types";
import { createArticle } from "../models/article";

async function fetchAvailableSources(apiKey: string): Promise<any[]> {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`
  );
  const data = await response.json();
  return data.sources;
}

async function FetchNewsApi(
  query: string,
  setLoadingOrgNews: (loadingOrgNews: boolean) => void,
  from: string,
  to: string,
  isSearchPage: boolean = false
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NEWS_API_ORG_KEY;
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  let url = `https://newsapi.org/v2/everything?language=en&apiKey=${apiKey}&sortBy=publishedAt`;

  setLoadingOrgNews(true);

  const customFeed = localStorage.getItem("customField");
  let parsedCustomFeed = {
    sources: "",
    categories: "",
    authors: "",
  };
  if (customFeed) parsedCustomFeed = JSON.parse(customFeed);

  if (!isSearchPage && customFeed && parsedCustomFeed.sources) {
    const availableSources = await fetchAvailableSources(apiKey);
    const matchedSources = parsedCustomFeed.sources
      .split(",")
      .map((source: string) => source.trim().toLowerCase())
      .filter((source: string) =>
        availableSources.some((s: any) => s.name.toLowerCase() === source)
      )
      .map(
        (source: string) =>
          availableSources.find((s: any) => s.name.toLowerCase() === source)?.id
      )
      .filter(Boolean) as string[];

    if (matchedSources.length > 0) {
      url = `https://newsapi.org/v2/everything?q=world&apiKey=${apiKey}&sources=${matchedSources.join(
        ","
      )}&page=1&pageSize=20&sortBy=publishedAt`;
    } else {
      setLoadingOrgNews(false);
      console.log("No matching sources found");
      return []; // Return an empty array if no matching sources
    }
  } else {
    if (query) {
      const keywords = query.split(",").map((keyword) => keyword.trim());
      const encodedKeywords = keywords.join(" OR ");
      url += `&q=${encodeURIComponent(encodedKeywords)}&searchIn=title`;
    } else {
      url += `&q='world'&searchIn=title&pageSize=20&page=1&sortBy=publishedAt`;
    }
    if (from && to) {
      url += `&from=${from}&to=${to}`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();

  setLoadingOrgNews(false);
  if (!data.articles) {
    console.log("No articles found");
    return [];
  }

  // Filter out articles with "[Removed]" in critical fields
  const filteredArticles = data.articles.filter((article: any) => {
    return (
      article.title !== "[Removed]" &&
      article.source.name !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.content !== "[Removed]"
    );
  });

  const categories = {
    business: ["business", "economy", "finance", "market"],
    entertainment: ["entertainment", "movie", "music", "celebrity"],
    general: ["general", "news"],
    health: ["health", "medicine", "wellness"],
    science: ["science", "research", "technology"],
    sports: [
      "sports",
      "game",
      "tournament",
      "athlete",
      "ufc",
      "wwe",
      "championship",
    ],
    technology: ["technology", "tech", "innovation", "gadgets"],
  };

  return filteredArticles.map((article: any) => {
    let articleCategory = "general";

    // Creating categories because the API doesn't provide it
    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        if (
          article?.title?.toLowerCase().includes(keyword) ||
          article?.description?.toLowerCase().includes(keyword)
        ) {
          articleCategory = category;
          break;
        }
      }
      if (articleCategory !== "general") break;
    }

    return createArticle({
      title: article.title,
      url: article.url,
      source: article.source.name,
      category: articleCategory,
      date: new Date(article.publishedAt),
      author:
        !article?.author?.includes("@") && article.author !== null
          ? article.author
          : "Unknown Author",
      keywords: [],
      image: article.urlToImage,
      body: article.description,
    });
  });
}

export default FetchNewsApi;
