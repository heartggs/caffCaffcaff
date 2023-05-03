import styles from "../assets/css/MainPage.module.css";
import Main from "../components/Main";
import Nav from "../components/Nav";
import SearchArea from "../components/SearchArea";

export default function MainPage() {
  return (
    <div className={styles.wrapper}>
      <SearchArea />
      <Main />
      <Nav />
    </div>
  );
}
