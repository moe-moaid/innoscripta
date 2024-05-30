import { ChangeEvent, KeyboardEvent } from "react";
import { useMainContext } from "../context/mainContext";
import FetchNewsApi from "../APIs/fetchNewsApi";
import { Article } from "../../types";

export default function SearchField() {
  const { search, setSearch, clickSearch, setClickSearch } = useMainContext();

  function handleTyping(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleSearching(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {

      const test = async ():Promise<Article[]> => {
        const news = await FetchNewsApi(search);
        return news;
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Click to search..."
        value={search}
        name="search"
        onChange={(e) => handleTyping(e)}
        onKeyDown={handleSearching}
      />
    </div>
  );
}
