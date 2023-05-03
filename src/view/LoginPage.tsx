import styles from "../assets/css/LoginPage.module.css";
import coffeeBean from "../assets/img/coffeebean.png";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div>
      <div className={styles.formWrapper}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>
            <img
              src={coffeeBean}
              alt="caff Caff caff"
              className={styles.logoImg}
            />
            <div className={styles.text}>caff 캪 caff</div>
          </div>
        </div>
        <div className={styles.bottomArea}>
          <form className={styles.loginForm}>
            <div>
              {/* <label htmlFor="user_id">아이디</label> */}
              <input
                type="text"
                name="user_id"
                placeholder="아이디를 입력해주세요"
              ></input>
            </div>
            <div>
              {/* <label htmlFor="user_password">비밀번호</label> */}
              <input
                type="password"
                name="user_password"
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>
            <button type="submit" className={styles.submitBtn}>
              가입하기
            </button>
          </form>
          <div className={styles.easyLogin}>
            <p>간편로그인하기</p>
            <button>
              <FcGoogle className={styles.googleLogin} />
            </button>
          </div>
          <div className={styles.textArea}>
            <p>비밀번호를 잊어버리셨나요?</p>
            <p>회원이 아니신가요?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
