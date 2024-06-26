import { useEffect, useState } from "react";
import FetchNytimesApi from "../APIs/fetchNytimesApi";
import { Article } from "../../types";
import { timeAgo } from "./relativeTime";
import { useMainContext } from "../context/mainContext";

function NyTimes() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { setLoadingNYTimesNews } = useMainContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const oneWeekAgoDate = new Date();
        oneWeekAgoDate.setDate(currentDate.getDate() - 7);

        // according to the docs of NYTimes api, the time format has to be: YYYYMMDD
        const to = currentDate.toISOString().split("T")[0].replace(/-/g, "");
        const from = oneWeekAgoDate
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
        const nytArticles = await FetchNytimesApi(
          "politics",
          from,
          to,
          setLoadingNYTimesNews
        );
        setArticles(nytArticles);
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
              className="bg-pink-50 border border-pink-300 text-grey-500 p-4 mb-4 flex flex-col md:flex-row justify-between items-center rounded-lg mx-4"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-2 w-full md:w-1/2">
                <img
                  className="w-[130px] h-[130px] rounded-md"
                  src={
                    a.image
                      ? `https://static01.nyt.com/${a.image}`
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
                <p className="md:max-w-[35%] w-auto md:text-end">category: {a.category}</p>
                <p className="">Posted: {timeAgo(a.date)}</p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default NyTimes;
