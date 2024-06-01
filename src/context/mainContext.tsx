import React, { createContext, useState, ReactNode, useContext } from "react";
import { Article, MainContextType } from "../../types";

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // search Query
  const [clickSearch, setClickSearch] = useState<boolean>(false); // track when the user clicks on the magnifying glass
  const [activeSearch, setActiveSearch] = useState<boolean>(false); // track if the search field is active to display the instructions
  const [isLoading, setIsLoading] = useState<boolean>(false); // to display animation while fetching
  const [searchResults, setSearchResults] = useState<Article[]>([]); // to separate the search results for filtering
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]); // keep track of different categories to display them in filters
  const [sourcesFilter, setSourcesFilter] = useState<string[]>([]); // keep track of different categories to display them in filters
  const [showCustomize, setShowCustomize] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        clickSearch,
        setClickSearch,
        activeSearch,
        setActiveSearch,
        searchResults,
        setSearchResults,
        isLoading,
        setIsLoading,
        categoriesFilter,
        setCategoriesFilter,
        sourcesFilter,
        setSourcesFilter,
        showCustomize,
        setShowCustomize
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};

export default MainContext;
