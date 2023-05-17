import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "../assets/Test.module.css";
import coffeeBean from "../assets/img/coffeebean.png";
import { AiOutlineRollback } from "react-icons/ai";
import cx from "clsx";
import { doc, setDoc } from "firebase/firestore";

interface loginForm {
  nickname: string;
  email: string;
  pw: string;
  pwConfirm: string;
  userType: string;
  weight: number;
}

export default function Test() {
  const [isMinor, setIsMinor] = useState(false);
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (e: any) => {
    switch (e.target.value) {
      case "성인":
        setIsMinor(false);
        setUserType(e.target.value);
        break;
      case "임산부":
        setIsMinor(false);
        setUserType(e.target.value);
        break;
      case "청소년":
        setIsMinor(true);
        setUserType(e.target.value);
        break;
      default:
        setIsMinor(false);
        setUserType(e.target.value);
    }
    setUserType(e.target.value);
  };

  useEffect(() => {
    setIsMinor(false);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<loginForm>({ mode: "onBlur" });

  const onValidCheck = (data: Record<string, any>) => {
    if (data.pw !== data.pwConfirm) {
      setError(
        "pwConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log(user, "/", uid);

        const userRef = doc(db, "users", uid);
        setDoc(userRef, {
          email: email,
          nickname: nickname,
          userType: userType,
          weight: weight,
        }).then(() => {
          updateProfile(user, {
            displayName: data.nickname,
          }).then(() => navigate("/search"));
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const handelGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.topArea}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img
              src={coffeeBean}
              alt="caff Caff caff"
              className={styles.logoImg}
            />
            <div className={styles.text}>caff 캪 caff</div>
          </h1>
        </Link>
        <div>
          <button onClick={handelGoBack} className={styles.backBtn}>
            <AiOutlineRollback className={styles.backIcon} />
            뒤로가기
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onValidCheck)}
        className={styles.formWrapper}
      >
        <fieldset className={styles.signUpWrapper}>
          <legend style={{ display: "none" }}>회원가입</legend>
          <div className={styles.div}>
            <input
              {...register("email", {
                required: "이메일을 올바르게 입력해주세요.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "이메일을 올바르게 입력해주세요.",
                },
              })}
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <span>{errors?.email?.message}</span>
          </div>
          <div className={styles.div}>
            <input
              {...register("pw", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message:
                    "숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
                },
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <span>{errors?.pw?.message}</span>
          </div>
          <div className={styles.div}>
            <input
              type="password"
              {...register("pwConfirm", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message:
                    "숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
                },
              })}
              placeholder="비밀번호를 한번 더 입력해주세요"
              autoComplete="off"
            />
            <span>{errors?.pwConfirm?.message}</span>
          </div>
          <div className={styles.div}>
            <input
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 3,
                  message: "3글자 이상 입력해주세요.",
                },
                pattern: {
                  value: /^[A-za-z0-9가-힣]{3,10}$/,
                  message: "가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자",
                },
              })}
              placeholder="닉네임을 입력해주세요"
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="off"
            />
            <span>{errors?.nickname?.message}</span>
          </div>
          <div className={styles.userInput}>
            <p>유저 타입을 선택해주세요</p>
            <div className={styles.inputWrapper}>
              <div className={styles.userType}>
                <label htmlFor="adult">성인</label>
                <input
                  type="radio"
                  id="adult"
                  value="성인"
                  {...register("userType", {
                    required: "유저타입을 선택해주세요",
                  })}
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.userType}>
                <label htmlFor="pregnant">임산부</label>
                <input
                  type="radio"
                  id="pregnant"
                  value="임산부"
                  {...register("userType", {
                    required: "유저타입을 선택해주세요",
                  })}
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.userType}>
                <label htmlFor="minor">청소년</label>
                <input
                  type="radio"
                  id="minor"
                  value="청소년"
                  {...register("userType", {
                    required: "유저타입을 선택해주세요",
                  })}
                  onChange={handleOptionChange}
                />
                {isMinor && (
                  <div className={cx(styles.modal, { [styles.opened]: open })}>
                    <input
                      type="number"
                      id="weight"
                      {...register("weight", {
                        required: true,
                        min: 1,
                        minLength: 2,
                      })}
                      placeholder="체중을 입력해주세요(숫자로만)"
                      onChange={(event) => setWeight(event.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            {errors?.userType?.message && userType == "" && (
              <span>{errors.userType.message}</span>
            )}
          </div>
        </fieldset>
        <input type="submit" value="가입하기" className={styles.signUpBtn} />
      </form>
    </>
  );
}
