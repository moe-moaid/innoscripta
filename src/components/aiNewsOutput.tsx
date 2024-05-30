import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchAiNewsApi from "../APIs/fetchAiNewsApi";

export default function AiNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nytArticles = await FetchAiNewsApi(
          "world",
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
                <p className="text-red-500 font-semibold">ID:: {index}</p>
                <a href={a.url} className="d-inline">
                  <p>{a.title}</p>
                </a>
                <p className="d-inline">{`${a?.date?.toLocaleDateString()} ${a?.date?.toLocaleTimeString()}`}</p>
                <p className="d-inline">
                  source from AI:: {a.source.split(".")[0]}
                </p>
                <p className="d-inline">cat:: {a.category}</p>
                <p className="d-inline">author:: {a.author}</p>
                <p className="d-inline">keywords:: {a.keywords}</p>
                <p className="d-inline">image:: {a.image}</p>
                <img
                  src={
                    a.image
                      ? a.image
                      : "https://www.dummyimage.co.uk/600x400/cbcbcb/959595/No Image Found/40"
                  }
                  alt="article thumbnail"
                  className="w-[250px] h-[250px] border border-gray-700 rounded-xl"
                />
                <p className="d-inline overflow-hidden whitespace-nowrap text-ellipsis w-[25%]">
                  body:: {a.body}
                </p>
              </div>
            </>
          ))}
    </div>
  );
}
