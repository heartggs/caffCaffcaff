import { useState, useEffect } from "react";
import styles from "../assets/css/SearchContent.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

interface Drink {
  name: string;
  imageUrl: string;
  caffeinePer: number;
  id: number;
}

export default function SearchPage() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [drinksPerPage, setDrinksPerPage] = useState<number>(5);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchDrinks() {
      const drinksRef = collection(db, "drink");
      const querySnapshot = await getDocs(drinksRef);

      const storage = getStorage();
      const drinkData: Drink[] = [];

      for (const doc of querySnapshot.docs) {
        const drink = doc.data() as Drink;
        const imageRef = ref(storage, `${drink.id}.jpeg`);
        const url = await getDownloadURL(imageRef);

        drink.imageUrl = url;
        drinkData.push(drink);
      }

      setDrinks(drinkData);
      setIsLoading(false);
    }

    fetchDrinks();
  }, []);

  const lastDrinkIndex = currentPage * drinksPerPage;
  const firstDrinkIndex = lastDrinkIndex - drinksPerPage;
  const currentDrinks = drinks.slice(firstDrinkIndex, lastDrinkIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(drinks.length / drinksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.contentWrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentDrinks.map((drink, index) => (
            <div key={index} className={styles.drinkItem}>
              <Link to={`/drink/${drink.id}`} className={styles.item}>
                <img
                  src={drink.imageUrl}
                  className={styles.circleImg}
                  alt={drink.name}
                />
                <div className={styles.textStyle}>
                  <span>{drink.name}</span>
                </div>
              </Link>
            </div>
          ))}
          <div className={styles.pagination}>
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={currentPage === number ? styles.active : ""}
                onClick={(id) => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
