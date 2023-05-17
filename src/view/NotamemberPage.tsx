import styles from "../assets/css/NotamemberPage.module.css";
import Nav from "../components/Nav";
import SearchArea from "../components/SearchArea";
import { useNavigate } from "react-router-dom";

export default function NotamemberPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  const handleGoSign = () => {
    navigate("/signUp");
  };

  return (
    <div className={styles.body}>
      <SearchArea />
      <div className={styles.memberWrapper}>
        <div className={styles.circleArea}>
          <div className={styles.ohCircle}>앗!</div>
        </div>
        <div className={styles.textArea}>
          <p>캪 회원이 아니시군요!</p>
          <p>캪회원이 되신다면,</p>
          <p>나의 적정 카페인 섭취량을 알 수 있고</p>
          <p>좋아하는 음료수를 따로 저장하여</p>
          <p>검색하지 않고 빠르게 찾아볼 수 있어요!</p>
          <p>저희 캪의 회원이 되어주시겠어요?</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.btnNo} onClick={handleGoBack}>
            아니요
          </button>
          <button className={styles.btnYes} onClick={handleGoSign}>
            네!
          </button>
        </div>
      </div>
      <Nav selectecdNav="" />
    </div>
  );
}
