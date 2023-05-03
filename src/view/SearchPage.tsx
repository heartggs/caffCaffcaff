import styles from "../assets/css/SearchPage.module.css";
import SearchArea from "../components/SearchArea";
import SearchContent from "../components/SearchContent";
import Nav from "../components/Nav";

export default function SearchPage() {
  return (
    <div className={styles.body}>
      <SearchArea />
      <SearchContent />
      <Nav />
    </div>
  );
}
