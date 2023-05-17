import styles from "../assets/css/MyInfo.module.css";
import { FiEdit } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import CalculateCaffeineIntake from "./CalculateCaffeineIntake";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

interface User {
  email: string | null;
  nickname: string;
  userType: string;
  weight: string;
  imageUrl: string | null;
}

export default function MyInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({
            email: user.email,
            nickname: userData.nickname,
            userType: userData.userType,
            weight: userData.weight,
            imageUrl: userData.imageUrl,
          });
        }
      } else {
        setUser(null);
        navigate("/canYouJoinUs");
      }
    });
    return unsubscribe;
  }, [auth, user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.backGround}>
        <div className={styles.editBtn} onClick={handleModalOpen}>
          <FiEdit className={styles.editIcon} />
          {isModalOpen && <Modal onclose={handleModalClose} />}
        </div>
        <img
          src={user?.imageUrl ?? "이미지 URL 없음"}
          className={styles.circleArea}
        />
        <div className={styles.textBox}>
          <div className={styles.topSection}>
            <div>
              <span>닉네임 : </span>
              <span>{user && user.nickname}</span>
            </div>
            <div className={styles.nicknameArea}>
              <p>{user && user.nickname}님은</p>
              <p>{user && user.userType}이십니다.</p>
            </div>
            {user?.userType === "minor" && (
              <div>
                <span>체중 : </span>
                <span>{user && user.weight}kg</span>
              </div>
            )}
          </div>
          <div className={styles.caffInfo}>카페인 적정 섭취량은?</div>
          <CalculateCaffeineIntake
            userType={user?.userType || ""}
            weight={user?.weight || ""}
          />
          <button className={styles.logoutBtn} onClick={handleLogout}>
            로그아웃하기
          </button>
        </div>
      </div>
    </div>
  );
}
