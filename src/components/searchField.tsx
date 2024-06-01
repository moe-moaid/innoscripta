import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { useMainContext } from "../context/mainContext";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { useNavigate } from "react-router-dom";

type Props = {
  query: string;
};
/**
 *
 * @param  query - get it from the pages it is being used at
 * e.g. at home page it is null by default, at search it is
 * null initially, then it takes the the value from the url
 * if the page is refresed to keep consistant search page.
 * @returns - it returns a compelete search field with button
 * and instruction for users to search by keywords
 */
function SearchField({ query }: Props) {
  const {
    searchQuery,
    setSearchQuery,
    activeSearch,
    setActiveSearch,
    setSearchResults,
    setIsLoading,
  } = useMainContext();
  const inputRef = useRef<HTMLDivElement>(null); // Correctly typing the ref
  const searchNavigation = useNavigate();

  function handleTyping(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchQuery(value);
  }

  function initiateSearching() {
    searchNavigation(`/searchresults?query=${encodeURIComponent(searchQuery)}`);
    setActiveSearch(false);
  }

  function handleSearching(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      initiateSearching();
    }
  }

  useEffect(() => {
    function handleClickInput(event: MouseEvent) {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        setActiveSearch(true);
      } else {
        setActiveSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickInput);
    return () => {
      document.removeEventListener("mousedown", handleClickInput);
    };
  }, [setActiveSearch]);

  return (
    <div
      className="relative flex flex-row justify-between border border-gray-400 rounded-md px-2 py-3 my-4 w-1/3"
      ref={inputRef}
    >
      <input
        className="outline-none w-full"
        type="text"
        placeholder="Click to search..."
        value={searchQuery || query}
        name="search"
        onChange={handleTyping}
        onKeyDown={handleSearching}
      />
      <button className="p-2" onClick={initiateSearching}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.39919 15.565C11.8889 15.565 14.7178 12.5713 14.7178 8.87844C14.7178 5.18556 11.8889 2.19189 8.39919 2.19189C4.90951 2.19189 2.08057 5.18556 2.08057 8.87844C2.08057 12.5713 4.90951 15.565 8.39919 15.565Z"
            stroke="#ACADB1"
            strokeWidth="1.05577"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.3825 16.269L14.0522 14.8613"
            stroke="#ACADB1"
            strokeWidth="1.05577"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {activeSearch && (
        <div className="absolute -bottom-6 left-0 right-0 border border-gray-500 rounded-md bg-white">
          <p className="px-4 text-[13px] text-gray-400">
            separate your keywords with ',' then click search or hit enter
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchField;
