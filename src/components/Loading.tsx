import styles from "../assets/css/Loading.module.css";
import coffeeBean from "../assets/img/coffeebean.png";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <div className={styles.textLoading}>
          <img
            src={coffeeBean}
            alt="caff Caff caff"
            className={styles.lodingCoffee}
          />
          <span>로</span>
        </div>
        <div className={styles.textLoading}>
          <img
            src={coffeeBean}
            alt="caff Caff caff"
            className={styles.lodingCoffee}
          />
          <span>딩</span>
        </div>
        <div className={styles.textLoading}>
          <img
            src={coffeeBean}
            alt="caff Caff caff"
            className={styles.lodingCoffee}
          />
          <span>중</span>
        </div>
      </div>
    </div>
  );
}
