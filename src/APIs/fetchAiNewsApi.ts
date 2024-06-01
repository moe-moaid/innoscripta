import { AiCategory, Article } from "../../types";
import { createArticle } from "../models/article";

const apiKey = process.env.REACT_APP_AI_NEWS_API_KEY;

/**
 *
 * @param categories - an aray of strings being passed from localStorage if any.
 * @returns - an array of strings containing the URIs of sources
 */
async function fetchCategoryUris(categories: string[]): Promise<string[]> {
  const promises = categories.map(async (category) => {
    const response = await fetch(
      "https://eventregistry.org/api/v1/suggestCategoriesFast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: category,
          page: 1,
          count: 20,
          apiKey: apiKey,
        }),
      }
    );
    const data = await response.json();
    return data[0]?.uri || "";
  });
  return Promise.all(promises);
}

/**
 *
 * @param sources - an aray of strings being passed from localStorage if any.
 * @returns an array of strings containing the URIs of sources
 */
async function fetchSourceUris(sources: string[]): Promise<string[]> {
  const promises = sources.map(async (source) => {
    const response = await fetch(
      "https://eventregistry.org/api/v1/suggestSourcesFast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: source,
          apiKey: apiKey,
        }),
      }
    );
    const data = await response.json();
    return data[0]?.uri || "";
  });
  return Promise.all(promises);
}

/**
 *
 * @param authors - an aray of strings being passed from localStorage if any.
 * @returns an array of strings containing the URIs of authors
 */
async function fetchAuthorUris(authors: string[]): Promise<string[]> {
  const promises = authors.map(async (author) => {
    const response = await fetch(
      "https://eventregistry.org/api/v1/suggestAuthorsFast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: author,
          apiKey: apiKey,
        }),
      }
    );
    const data = await response.json();
    return data[0]?.uri || "";
  });
  return Promise.all(promises);
}

export default async function FetchAiNewsApi(
  query: string,
  from: string,
  to: string,
  setIsLoading: (isLoading: boolean) => void
): Promise<Article[]> {
  let url = `https://eventregistry.org/api/v1/article/getArticles`;

  setIsLoading(true);

  const customFeed = localStorage.getItem("customField");
  let parsedCustomFeed = {
    sources: "",
    categories: "",
    authors: "",
  };
  if (customFeed) parsedCustomFeed = JSON.parse(customFeed);

  const categoryUris = parsedCustomFeed.categories
    ? await fetchCategoryUris(
        parsedCustomFeed.categories.split(",").map((cat) => cat.trim())
      )
    : [];
  const sourceUris = parsedCustomFeed.sources
    ? await fetchSourceUris(
        parsedCustomFeed.sources.split(",").map((src) => src.trim())
      )
    : [];
  const authorUris = parsedCustomFeed.authors
    ? await fetchAuthorUris(
        parsedCustomFeed.authors.split(",").map((auth) => auth.trim())
      )
    : [];

  const requestBody: any = {
    action: "getArticles",
    resultType: "articles",
    sortBy: "date",
    sortByAsc: true,
    apiKey: apiKey,
    articlesCount: 20,
    page: 1,
    // keyword: query,
    categoryOper: "or",
    dateStart: from,
    dateEnd: to,
    includeConcepts: true,
    includeCategories: true,
    lang: "eng",
    ...(categoryUris.length > 0 && { categoryUri: categoryUris }),
    ...(sourceUris.length > 0 && { sourceUri: sourceUris }),
    ...(authorUris.length > 0 && { authorUri: authorUris }),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  setIsLoading(false);

  if (!data.articles || data.articles.results.length === 0) {
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
