import styles from "../assets/css/SearchDeatail.module.css";

export default function SearchDeatail() {
  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detailItem}>
        <h3>코카콜라 355ml</h3>
        <div className={styles.detailImg}></div>
        <div className={styles.infoBox}>
          <div>
            <span>카페인 : </span>
            <span>38mg</span>
          </div>
          {/* 해당 아래 영역은 회원에게만 제공하는 기능 */}
          <div>
            <span>적정섭취량의</span>
            <span>n%</span>
            <span>입니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
