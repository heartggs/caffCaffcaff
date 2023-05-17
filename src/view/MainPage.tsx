import Main from "../components/Main";
import Nav from "../components/Nav";
import SearchArea from "../components/SearchArea";

export default function MainPage() {
  return (
    <div>
      <SearchArea />
      <Main />
      <Nav selectecdNav="home" />
    </div>
  );
}
