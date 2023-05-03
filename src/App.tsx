import "./app.css";
import Login from "./view/LoginPage";
import MainPage from "./view/MainPage";
import SignUpPage from "./view/SignUpPage";
import SearchPage from "./view/SearchPage";
import FavoritePage from "./view/FavoritePage";
import NotamemberPage from "./view/NotamemberPage";
import MyinfoPage from "./view/MyinfoPage";
import app from "./firebase/firebase";

function App() {
  return (
    <>
      {/* <MainPage /> */}
      {/* <Login /> */}
      <SignUpPage />
      {/* <SearchPage /> */}
      {/* <FavoritePage /> */}
      {/* <NotamemberPage /> */}
      {/* <MyinfoPage /> */}
    </>
  );
}

export default App;
