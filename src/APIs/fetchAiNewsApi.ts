import { AiCategory, Article } from "../../types";
import { createArticle } from "../models/article";

export default async function FetchAiNewsApi(
  query: string,
  from: string,
  to: string,
  setIsLoading: (isLoading: boolean) => void
): Promise<Article[]> {
  const apiKey = process.env.REACT_APP_AI_NEWS_API_KEY;
  let url = `https://eventregistry.org/api/v1/article/getArticles`;

  setIsLoading(true);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "getArticles",
      resultType: "articles",
      articleSortBy: "date",
      articleSortByAsc: true,
      apiKey: apiKey,
      articlesCount: 20,
      articlePage: 1,
      keyword: query,
      dateStart: from,
      dateEnd: to,
      articlesSortBy: "date",
      includeArticleConcepts: true,
      includeArticleCategories: true,
      lang: "eng",
    }),
  });

  const data = await response.json();
  setIsLoading(false);

  if (!data.articles) {
    throw new Error("No articles found");
  }

  return data.articles.results.map(
    (article: any) =>
      article &&
      createArticle({
        title: article.title,
        url: article.url,
        source: article.source.uri.split(".")[0],
        category: article?.categories
          ?.map((category: any) => {
            const catParts = category.label.split("/");
            return catParts[catParts.length - 1];
          })
          .join(", "),
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
