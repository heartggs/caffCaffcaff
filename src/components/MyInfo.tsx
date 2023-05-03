import styles from "../assets/css/MyInfo.module.css";
import { FiEdit } from "react-icons/fi";

export default function MyInfo() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.backGround}>
        <FiEdit className={styles.editIcon} />
        <div className={styles.circleArea}></div>
        <div className={styles.textBox}>
          <div className={styles.topSection}>
            <div>
              <span>닉네임 : </span>
              <span>정혜지</span>
            </div>
            <div>
              <span>정혜지</span>
              <span>님은</span>
              <span>성인이십니다.</span>
            </div>
            <div>
              <span>체중 : </span>
              <span>40kg</span>
            </div>
          </div>
          <div className={styles.caffInfo}>카페인 적정 섭취량은?</div>
          <div className={styles.caffNumber}>100mg</div>
        </div>
      </div>
    </div>
  );
}
