import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../Firebase";
import styles from "../assets/css/Main.module.css";
import { Link } from "react-router-dom";

interface Drink {
  name: string;
  imageUrl: string;
  caffeinePer: number;
  id: number;
}

export default function Main() {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  async function getRandomDrink() {
    const drinksRef = collection(db, "drink");
    const querySnapshot = await getDocs(drinksRef);
    const numDrinks = querySnapshot.docs.length;

    const randomIndex = Math.floor(Math.random() * numDrinks);
    const randomDrink = querySnapshot.docs[randomIndex].data() as Drink;

    const storage = getStorage();
    const imageRef = ref(storage, `${randomDrink.id}.jpeg`);
    const url = await getDownloadURL(imageRef);

    randomDrink.imageUrl = url;
    setDrinks([randomDrink]);
  }

  useEffect(() => {
    getRandomDrink();
  }, []);

  return (
    <div className={styles.body}>
      <h3>오늘의 카페인 음료</h3>
      {drinks.map((drink) => (
        <Link to={`/drink/${drink.id}`} key={drink.id}>
          <div key={drink.id}>
            <div className={styles.drinkImg}>
              <img
                src={drink.imageUrl}
                className={styles.urlImg}
                alt={drink.name}
              />
            </div>
            <div className={styles.infoBox}>
              <div key={`${drink.id}-name`}>
                <span>{drink.name}</span>
              </div>
              <div className={styles.bottomInfo}>
                <span>카페인 </span>
                <span>{drink.caffeinePer}mg</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
