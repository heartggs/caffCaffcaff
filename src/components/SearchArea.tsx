import styles from "../assets/css/SearchArea.module.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchArea() {
  return (
    <div>
      <div className={styles.formInput}>
        <label htmlFor="searchKeyword">검색</label>
        <input
          type="text"
          id="searchKeyword"
          placeholder="찾고 싶은 음료를 검색하세요!"
        ></input>
        <AiOutlineSearch className={styles.searchButton} />
      </div>
    </div>
  );
}
