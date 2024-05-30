import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchNewsApi from "../APIs/fetchNewsApi";

export default function NewsApi() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nytArticles = await FetchNewsApi(
          "politics",
          "2024-05-27",
          "2024-05-29"
        );
        setArticles(nytArticles);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {articles &&
        articles
          .filter((a: Article) => a.date)
          .map((a: Article, index: number) => (
            <>
              <div
                key={index}
                className="bg-gray-300 border-b border-gray-200 text-grey-500 p-4 mb-2"
              >
                <a href={a.url} className="d-inline">
                  <p>{a.title}</p>
                </a>
                <p className="d-inline">{`${a?.date?.toLocaleDateString()} ${a?.date?.toLocaleTimeString()}`}</p>
                <p className="d-inline">source:: {a.source.split(".")[0]}</p>
                <p className="d-inline">cat:: {a.category}</p>
                <p className="d-inline">author:: {a.author}</p>
                <p className="d-inline">keywords:: {a.keywords}</p>
                <p className="d-inline">image:: {a.image}</p>
                <p className="d-inline">body:: {a.body}</p>
              </div>
            </>
          ))}
    </div>
  );
}
