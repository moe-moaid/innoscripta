import "./App.css";
import { MainContextProvider } from "./context/mainContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchRessults from "./components/SearchRessultsPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <MainContextProvider>
        <div className="App">
          <header className="App-header"></header>
          <Routes>
            <Route path="/searchresults" element={<SearchRessults />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </MainContextProvider>
    </Router>
  );
}

export default App;
