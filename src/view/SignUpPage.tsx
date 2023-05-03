// import { Link } from "react-router-dom";
import firebase from "../firebase/firebase";
import styles from "../assets/css/SignUpPage.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  };

  return (
    <>
      <div>
        <div className={styles.topArea}>
          <h1>
            logo
            {/* <Link to="/"></Link> */}
          </h1>
          <div>
            <button>뒤로가기</button>
          </div>
        </div>
      </div>
      <div className={styles.signUpWrapper}>
        <div>
          <label htmlFor="user_email">이메일</label>
          <input
            type="text"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="user_password">비밀번호</label>
          <input
            type="password"
            name="user_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="user_password">비밀번호 확인</label>
          <input type="password" name="user_password_verify"></input>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" name="nickname"></input>
        </div>
        <div>
          <label htmlFor="weight">체중</label>
          <input type="number" name="weight"></input>
          <p>체중을 입력해 주시면, 카페인 섭취량을 알려드려요</p>
        </div>
      </div>
      <button type="submit" onClick={signup}>
        가입하기
      </button>
    </>
  );
}
