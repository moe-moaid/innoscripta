import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { useMainContext } from "../context/mainContext";

export default function NewsApi() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { search } = useMainContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsOrg = await FetchNewsApi(
          search || 'palestine',
          // "2009-05-27",
          // "2017-05-29",
          // 1
        );
        setArticles(newsOrg);
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
