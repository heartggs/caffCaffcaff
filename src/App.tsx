import "./assets/css/App.css";
import MainPage from "./view/MainPage";
import SignUpPage from "./view/SignUpPage";
import SearchPage from "./view/SearchPage";
import FavoritePage from "./view/FavoritePage";
import NotamemberPage from "./view/NotamemberPage";
import MyinfoPage from "./view/MyinfoPage";
import DrinkDeatil from "./components/DrinkDetil.tsx";
import LoginPage from "./view/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/logIn" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/drink/:id" element={<DrinkDeatil />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/canYouJoinUs" element={<NotamemberPage />} />
          <Route path="/myinfo" element={<MyinfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
