import styles from "../assets/css/Main.module.css";

export default function Main() {
  return (
    <div className={styles.body}>
      <h3>이번주 새로운 음료</h3>
      <div className={styles.drinkImg}></div>
      <div className={styles.infoBox}>
        <div>
          <span>이름 : </span>
          <span>코카콜라 355ml</span>
        </div>
        <div className={styles.bottomInfo}>
          <span>카페인 </span>
          <span>38mg</span>
        </div>
      </div>
    </div>
  );
}
