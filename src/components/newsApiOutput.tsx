import { useEffect, useState } from "react";
import { Article } from "../../types";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { useMainContext } from "../context/mainContext";
import { timeAgo } from "./relativeTime";

function NewsApi() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { searchQuery, setIsLoading } = useMainContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsOrg = await FetchNewsApi(
          searchQuery,
          setIsLoading,
          "",
          "",
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
                className="bg-gray-300 border-b border-gray-200 text-grey-500 p-4 mb-2 flex flex-row justify-between"
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
                <div className="flex flex-col items-end w-[100%]">
                  <p className="">{a?.source?.split(".")[0]}</p>
                  <p className="">by {a?.author?.split(",")[0]}</p>
                  <p className="d-inline">category: {a.category}</p>
                  <p className="d-inline">Posted @: {timeAgo(a.date)}</p>
                </div>

                {/* <p className="d-inline">{`${a?.date?.toLocaleDateString()} ${a?.date?.toLocaleTimeString()}`}</p> */}
                {/* <p className="d-inline">cat:: {a.category}</p> */}
                {/* <p className="d-inline">keywords:: {a.keywords}</p> */}
                {/* <p className="d-inline">image:: {a.image}</p> */}
                {/* <p className="d-inline">body:: {a.body}</p> */}
              </div>
            </>
          ))}
    </div>
  );
}

export default NewsApi;
