import "./app.css";
import MainPage from "./view/MainPage";
import { app } from "./Firebase.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./view/LoginPage";

function App() {
  console.log(app);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/logIn" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
