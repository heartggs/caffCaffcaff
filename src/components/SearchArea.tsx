import styles from "../assets/css/SearchArea.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

interface Drink {
  name: string;
  imageUrl: string;
  caffeinePer: number;
  id: number;
}

export default function SearchArea() {
  const [search, setSearch] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handelSearch(search);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearch(value);
    console.log(value);
    dataLoad(value);
  };

  async function dataLoad(searchValue: string) {
    const drinksRef = collection(db, "drink");
    const querySnapshot = await getDocs(drinksRef);
    const filteredDrinks = querySnapshot.docs
      .map((doc) => doc.data() as Drink)
      .filter((drink) => drink.name.includes(searchValue));
    setFilteredDrinks(filteredDrinks);
  }

  const selectDrink = (drink: Drink) => {
    setSearch(drink.name);
    setFilteredDrinks([]);
    inputRef.current?.focus();
  };

  async function handelSearch(search: string) {
    const drinksRef = collection(db, "drink");
    const querySnapshot = await getDocs(drinksRef);
    const filteredDrinks = querySnapshot.docs.map((doc) => doc.data() as Drink);
    const selectedDrink: Drink | undefined = filteredDrinks.find(
      (drink) => drink.name === search
    );
    if (selectedDrink) {
      navigate(`/drink/${selectedDrink.id}`);
    } else {
      console.log("해당하는 음료가 없습니다.");
    }
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.formInput}>
        <label htmlFor="searchKeyword">검색</label>
        <div className={styles.inputForm}>
          <button
            className={styles.searchButton}
            onClick={() => {
              handelSearch(search);
            }}
          >
            <AiOutlineSearch className={styles.searchBtn} />
          </button>
          <input
            type="text"
            id="searchKeyword"
            placeholder="찾고 싶은 음료를 검색하세요!"
            value={search}
            onChange={onChange}
            ref={inputRef}
            onKeyDown={onKeyDown}
            autoComplete="off"
          ></input>
          {search && filteredDrinks.length > 0 && (
            <ul className={styles.searchResult}>
              {filteredDrinks.map((drink) => {
                return (
                  <li key={drink.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        selectDrink(drink);
                      }}
                      className={styles.drink}
                    >
                      <span>{drink.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
