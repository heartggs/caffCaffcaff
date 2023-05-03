import styles from "../assets/css/FavoritePage.module.css";
import Favorite from "../components/Favorite";
import Nav from "../components/Nav";
import SearchArea from "../components/SearchArea";

export default function FavoritePage() {
  return (
    <div className={styles.body}>
      <SearchArea />
      <Favorite />
      <Nav />
    </div>
  );
}
