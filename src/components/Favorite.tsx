import styles from "../assets/css/Favorite.module.css";
import { AiFillStar } from "react-icons/ai";

export default function Favorite() {
  const favotieDrinks = [
    { name: "코카콜라 355ml", caffine: 38 },
    { name: "코카콜라 355ml", caffine: 38 },
    { name: "코카콜라 355ml", caffine: 38 },
    { name: "코카콜라 355ml", caffine: 38 },
    { name: "코카콜라 355ml", caffine: 38 },
  ];

  return (
    <div className={styles.contentWrapper}>
      {favotieDrinks.map((favorite, index) => (
        <div className={styles.drinkItem} key={index}>
          <div className={styles.circleImg}></div>
          <AiFillStar className={styles.favoriteIcon} />
          <div className={styles.infoArea}>
            <p className={styles.name}>{favorite.name}</p>
            <span>카페인</span>
            <span>{favorite.caffine}mg</span>
          </div>
        </div>
      ))}
    </div>
  );
}
