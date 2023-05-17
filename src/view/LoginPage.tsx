import { auth } from "../Firebase";
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

  const handleLogin = async () => {
    try {
      const user = signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className={styles.formWrapper}>
        <div className={styles.logoArea}>
          <Link to="/">
            <div className={styles.logo}>
              <img
                src={coffeeBean}
                alt="caff Caff caff"
                className={styles.logoImg}
              />
              <div className={styles.text}>caff 캪 caff</div>
            </div>
          </Link>
        </div>
        <div className={styles.bottomArea}>
          <form className={styles.loginForm}>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              ></input>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>
            <button className={styles.submitBtn} onClick={handleLogin}>
              가입하기
            </button>
          </form>
          <div className={styles.easyLogin}>
            <p>간편로그인하기</p>
            <button onClick={handleGoogleLogin}>
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
