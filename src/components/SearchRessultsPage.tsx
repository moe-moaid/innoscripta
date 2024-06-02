import { useEffect, useState } from "react";
import { Article } from "../../types";
import { useMainContext } from "../context/mainContext";
import SearchField from "./searchField";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { timeAgo } from "./relativeTime";
import { useLocation } from "react-router-dom";
import FiltersDropdown from "./filtersDropdown";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function SearchResults() {
  const {
    setSearchResults,
    searchResults,
    isLoading,
    setIsLoading,
    categoriesFilter,
    setCategoriesFilter,
    sourcesFilter,
    setSourcesFilter,
  } = useMainContext();

  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Keep track of the selected category filter
  const [selectedSource, setSelectedSource] = useState<string>(""); // Keep track of the selected source filter
  const [selectedTime, setSelectedTime] = useState<string>(""); // Keep track of the selected time filter

  const query = useQuery().get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const currentDate = new Date();
        const oneWeekAgoDate = new Date();
        oneWeekAgoDate.setDate(currentDate.getDate() - 7);
        const from = oneWeekAgoDate.toISOString().split("T")[0];
        const to = currentDate.toISOString().split("T")[0];

        const newsOrg = await FetchNewsApi(query, setIsLoading, from, to, true);

        // Create unique set of the available categories
        const categories = newsOrg
          .map((article) => article.category)
          .filter(
            (category): category is string =>
              category !== null && category !== undefined
          );
        const uniqueCategories = Array.from(new Set(categories));
        setCategoriesFilter(uniqueCategories);

        // Create unique set of the available sets
        const sources = newsOrg
          .map((article) => article.source)
          .filter((source) => source);
        const uniqueSources = Array.from(new Set(sources));
        setSourcesFilter(uniqueSources);

        setSearchResults(newsOrg); // Set the fetched articles to searchResults context for later use in filtering and rendering
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    query,
    setIsLoading,
    setSearchResults,
    setCategoriesFilter,
    setSourcesFilter,
  ]);

  const filteredResults = searchResults
    .filter(
      (article) =>
        (selectedCategory ? article.category === selectedCategory : true) &&
        (selectedSource ? article.source === selectedSource : true)
    )
    .sort((a, b) => {
      if (selectedTime === "ascending") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (selectedTime === "descending") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return (
    <>
      <div className="flex flex-col items-center mx-5 md:mx-0">
      <SearchField query={query} />
      <p className="font-medium">Filter your results</p>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
      <FiltersDropdown
        filterName="categories"
        filterOptions={categoriesFilter}
        selectedValue={selectedCategory}
        onChange={setSelectedCategory}
      />
      <FiltersDropdown
        filterName="sources"
        filterOptions={sourcesFilter}
        selectedValue={selectedSource}
        onChange={setSelectedSource}
      />
      <FiltersDropdown
        filterName="time"
        filterOptions={["ascending", "descending"]}
        selectedValue={selectedTime}
        onChange={setSelectedTime}
      />

      </div>
    </div>

      <div>
        {isLoading && (
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            role="status"
          >
            <svg
              aria-hidden="true"
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {filteredResults.map((a: Article, index: number) => (
          <div
              key={index}
              className="bg-transparent border border-gray-300 text-grey-500 p-4 mb-4 flex flex-col md:flex-row justify-between items-center rounded-lg mx-4"
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
        {(!filteredResults || filteredResults.length === 0) && !isLoading && (
          <p>No results were found for your search</p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
