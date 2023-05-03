import styles from "../assets/css/MyinfoPage.module.css";
import MyInfo from "../components/MyInfo";
import Nav from "../components/Nav";
import SearchArea from "../components/SearchArea";

export default function MyinfoPage() {
  return (
    <div className={styles.body}>
      <SearchArea />
      <MyInfo />
      <Nav />
    </div>
  );
}
