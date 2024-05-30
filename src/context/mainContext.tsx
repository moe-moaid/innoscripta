import React, { createContext, useState, ReactNode, useContext } from 'react';
import { MainContextType } from '../../types';

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [clickSearch, setClickSearch] = useState<boolean>(false);

  return (
    <MainContext.Provider value={{ search, setSearch, clickSearch, setClickSearch }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};

export default MainContext;





