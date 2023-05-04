import { auth } from "../Firebase.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styles from "../assets/css/LoginPage.module.css";
import coffeeBean from "../assets/img/coffeebean.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password);
      console.log(loginUser);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

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
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              ></input>
            </div>
            <div>
              {/* <label htmlFor="user_password">비밀번호</label> */}
              <input
                type="password"
                name="user_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>
            <button type="submit" className={styles.submitBtn} onClick={login}>
              가입하기
            </button>
          </form>
          <div className={styles.easyLogin}>
            <p>간편로그인하기</p>
            <button onClick={loginGoogle}>
              <FcGoogle className={styles.googleLogin} />
            </button>
          </div>
          <div className={styles.textArea}>
            <p>비밀번호를 잊어버리셨나요?</p>
            <Link to="/signUp">
              <p>회원이 아니신가요?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
