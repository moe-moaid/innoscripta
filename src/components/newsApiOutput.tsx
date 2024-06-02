import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { useMainContext } from "../context/mainContext";
import { timeAgo } from "./relativeTime";

function NewsApi() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { searchQuery, setLoadingOrgNews } = useMainContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsOrg = await FetchNewsApi(
          searchQuery,
          setLoadingOrgNews,
          "",
          ""
          // 1
        );
        setArticles(newsOrg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(articles);
  
  return (
    <div>
      {articles &&
        articles
          .filter((a: Article) => a.date)
          .map((a: Article, index: number) => (
            <div
              key={index}
              className="bg-violet-50 border border-violet-300 text-grey-500 p-4 mb-4 flex flex-col md:flex-row justify-between items-center rounded-lg mx-4"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-2 w-full md:w-1/2">
                <img
                  className="w-[130px] h-[130px] rounded-md"
                  src={
                    a.image
                      ? a.image
                      : "https://www.dummyimage.co.uk/600x400/cbcbcb/959595/No Image Found/40"
                  }
                  alt="article thumbnail"
                />
                <div className="w-full md:w-[70%]">
                  <a href={a.url} className="">
                    <p className="font-semibold text-center md:text-start">{a.title}</p>
                  </a>
                  <p className="w-full md:w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {a.body}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end w-[100%] my-2">
                <p className="mt-2">{a?.source?.split(".")[0]}</p>
                <p className="">by {a?.author?.split(",")[0]}</p>
                <p className="md:max-w-[35%] w-auto">category: {a.category}</p>
                <p className="">Posted: {timeAgo(a.date)}</p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default NewsApi;
