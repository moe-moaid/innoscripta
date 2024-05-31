import React, { createContext, useState, ReactNode, useContext } from "react";
import { Article, MainContextType } from "../../types";

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>(""); // search Query
  const [clickSearch, setClickSearch] = useState<boolean>(false); //
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  return (
    <MainContext.Provider
      value={{
        searchQuery: search,
        setSearchQuery: setSearch,
        clickSearch,
        setClickSearch,
        activeSearch,
        setActiveSearch,
        searchResults,
        setSearchResults,
        isLoading,
        setIsLoading,
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
