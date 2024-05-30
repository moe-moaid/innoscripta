import './App.css';
import SearchField from './components/searchField';
import AiNews from './components/aiNewsOutput';
import NewsApi from './components/newsApiOutput';
import NyTimes from './components/nytimesOutput';
import { MainContextProvider } from './context/mainContext';

function App() {
  return (
    <MainContextProvider>
    <div className="App">
      <header className="App-header">
        
      </header>
      <SearchField />
      <NewsApi />
      {/* <AiNews /> */}
      {/* <NyTimes /> */}
    </div>
    </MainContextProvider>
  );
}

export default App;
