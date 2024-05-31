import { Article } from "../../types";
import { createArticle } from "../models/article";


async function FetchNewsApi(
  query: string,
  setIsLoading: (isLoading: boolean) => void
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_NEWS_API_ORG_KEY;
  let url = `https://newsapi.org/v2/everything?language=en&apiKey=${apiKey}`;
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

  setIsLoading(true);
  if (query) {
    const keywords = query.split(",").map((keyword) => keyword.trim());
    const encodedKeywords = keywords.join(" OR ");
    url += `&q=${encodeURIComponent(encodedKeywords)}&searchIn=title`;
  } else url += `&q='world'&searchIn=title&pageSize=20&page=1`

  const response = await fetch(url);
  const data = await response.json();

  setIsLoading(false);
  if (!data.articles) {
    setIsLoading(false);
    console.log("No articles found");
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
