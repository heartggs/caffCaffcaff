import styles from "../assets/css/Modal.module.css";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SiBuymeacoffee } from "react-icons/si";
import cx from "clsx";

interface ModalProps {
  onclose: (isModalClose: boolean) => void;
}

export default function Modal({ onclose }: ModalProps) {
  const [updatedUser, setUpdatedUser] = useState({});
  const [modalClose, setModalClose] = useState(false);
  const [selectMinor, setSelectMinor] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const closeModal = () => {
    setModalClose(true);
    onclose(true);
  };

  const updateUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      try {
        const imageDownload = getDownloadURL(
          ref(storage, `users/${uid}/profileImage`)
        );
        console.log(imageDownload);
        await setDoc(userDocRef, updatedUser, { merge: true });
        alert("회원 정보가 수정되었습니다.");
        setModalClose(true);
        setUpdatedUser({});
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (modalClose) {
      onclose(true);
    }
  }, [modalClose, onclose]);

  const handleEditType = (e: any) => {
    switch (e.target.value) {
      case "성인":
        setSelectMinor(false);

        setUpdatedUser((prevUser) => ({
          ...prevUser,
          userType: e.target.value,
        }));
        break;
      case "임산부":
        setSelectMinor(false);

        setUpdatedUser((prevUser) => ({
          ...prevUser,
          userType: e.target.value,
        }));
        break;
      case "청소년":
        setSelectMinor(true);
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          userType: e.target.value,
        }));
        break;
      default:
        setSelectMinor(false);
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          userType: e.target.value,
        }));
    }
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      userType: e.target.value,
    }));
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const user = auth.currentUser;
    const uid = user?.uid;
    const storageRef = ref(storage, `users/${uid}/profileImage`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    setImageUrl(url);

    setUpdatedUser((prevUser) => ({
      ...prevUser,
      imageUrl: url,
    }));
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contents}>
        <h3>회원정보수정</h3>
        {imageUrl ? (
          <img src={imageUrl} className={styles.editImg} alt="프로필 이미지" />
        ) : (
          <div className={styles.editImg}>
            <SiBuymeacoffee className={styles.defaultImg} />
          </div>
        )}
        <input type="file" onChange={handleFileChange} id="userImg" />
        <div className={styles.editInput}>
          <input
            type="text"
            placeholder="새로운 닉네임을 입력해주세요"
            onChange={(e) =>
              setUpdatedUser((prevUser) => ({
                ...prevUser,
                nickname: e.target.value,
              }))
            }
          />
          <div className={styles.editUserWrapper}>
            <div
              className={cx(styles.uerTypeWrapper, {
                [styles.weight]: selectMinor,
              })}
            >
              <p>새로운 유저타입을 선택해주세요</p>
              <div className={styles.userRadio}>
                <div className={styles.user}>
                  <label htmlFor="adult">성인</label>
                  <input
                    type="radio"
                    id="adult"
                    value="성인"
                    name="userType"
                    onChange={handleEditType}
                  />
                </div>
                <div className={styles.user}>
                  <label htmlFor="pregnant">임산부</label>
                  <input
                    type="radio"
                    id="pregnant"
                    value="임산부"
                    name="userType"
                    onChange={handleEditType}
                  />
                </div>
                <div className={styles.user}>
                  <label htmlFor="minor">청소년</label>
                  <input
                    type="radio"
                    id="minor"
                    value="청소년"
                    name="userType"
                    onChange={handleEditType}
                  />
                </div>
              </div>
            </div>
            {selectMinor && (
              <div>
                <input
                  type="text"
                  placeholder="새로운 체중을 입력해주세요"
                  onChange={(e) =>
                    setUpdatedUser((prevUser) => ({
                      ...prevUser,
                      weight: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.BtnWrapper}>
          <button
            className={cx(styles.modalBtn, styles.cancelBtn)}
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className={cx(styles.modalBtn, styles.editBtn)}
            onClick={updateUser}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
