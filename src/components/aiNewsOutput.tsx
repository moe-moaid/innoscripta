import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchAiNewsApi from "../APIs/fetchAiNewsApi";
import { timeAgo } from "./relativeTime";
import { useMainContext } from "../context/mainContext";

function AiNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { setIsLoading } = useMainContext();

  useEffect(() => {
    const fetchData = async () => {
        const currentDate = new Date();
        const oneWeekAgoDate = new Date();
        oneWeekAgoDate.setDate(currentDate.getDate() - 7);
        const from = oneWeekAgoDate.toISOString().split("T")[0];
        const to = currentDate.toISOString().split("T")[0];
      try {
        const aiNews = await FetchAiNewsApi("world", from, to, setIsLoading);
        setArticles(aiNews);
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
            <div
              key={index}
              className="bg-yellow-50 border border-yellow-300 p-4 mb-4 flex flex-row justify-between rounded-lg mx-4"
            >
              <div className="flex flex-row space-x-2 w-1/2">
                <img
                  className="w-[130px] h-[130px] rounded-md"
                  src={
                    a.image
                      ? a.image
                      : "https://www.dummyimage.co.uk/600x400/cbcbcb/959595/No Image Found/40"
                  }
                  alt="article thumbnail"
                />
                <div className="w-[70%]">
                  <a href={a.url} className="">
                    <p className="font-semibold">{a.title}</p>
                  </a>
                  <p className="w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {a.body}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end w-1/2">
                <p className="">{a?.source?.split(".")[0]}</p>
                <p className="">By {a?.author?.split(",")[0]}</p>
                <p className="max-w-[25%] w-auto overflow-hidden whitespace-nowrap text-ellipsis">
                  Category: {a.category}
                </p>
                <p className="d-inline">posted: {timeAgo(a.date)}</p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default AiNews;
