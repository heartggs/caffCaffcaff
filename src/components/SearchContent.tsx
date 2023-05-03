import styles from "../assets/css/SearchContent.module.css";
import { AiFillStar } from "react-icons/ai";

export default function SearchPage() {
  const drinks = [
    { name: "코카콜라 355ml" },
    { name: "코카콜라 355ml" },
    { name: "코카콜라 355ml" },
    { name: "코카콜라 355ml" },
    { name: "코카콜라 355ml" },
  ];

  return (
    <div className={styles.contentWrapper}>
      {drinks.map((drink, index) => (
        <div key={index} className={styles.drinkItem}>
          <div className={styles.circleImg}></div>
          <AiFillStar className={styles.favoriteIcon} />
          <span>{drink.name}</span>
        </div>
      ))}
    </div>
  );
}
