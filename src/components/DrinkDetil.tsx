import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../assets/css/DrinkDetil.module.css";
import Nav from "./Nav";
import SearchArea from "./SearchArea";
import { AiFillStar } from "react-icons/ai";
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import DailyValue from "./DailyValue";
import { onAuthStateChanged } from "firebase/auth";

interface Drink {
  name: string;
  caffeinePer: number;
  imageUrl: string;
  id: number;
}

export default function DrinkDetil() {
  const [drinkInfo, setDrinkInfo] = useState<Drink | null>(null);
  const id: string | undefined = useParams<{ id: string }>().id;
  const [forMember, setForMember] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const createFavoriteDocument = async (uid: string) => {
      const favoriteDocRef = doc(db, "favorite", uid);

      const favoriteDoc = await getDoc(favoriteDocRef);
      if (!favoriteDoc.exists()) {
        await setDoc(favoriteDocRef, {});
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setForMember(true);
        const uid = user.uid;
        createFavoriteDocument(uid);
      } else {
        setForMember(false);
      }
    });
  }, [auth]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const uid = user?.uid;
    const favoriteDocRef = doc(db, "favorite", uid);

    async function checkIsFavorite() {
      const IsFavoriteDoc = await getDoc(favoriteDocRef);
      const IsFavoriteData = IsFavoriteDoc.data();
      if (IsFavoriteData && IsFavoriteData[id as string]) {
        setIsFavorite(true);
      }
    }
    checkIsFavorite();
  }, []);

  const handleFavoriteClick = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/canYouJoinUs");
      return;
    }

    const uid = user?.uid;
    const favoriteDocRef = doc(db, "favorite", uid);

    if (!isFavorite) {
      await updateDoc(favoriteDocRef, {
        [id as string]: drinkInfo,
      });
    } else {
      await updateDoc(favoriteDocRef, {
        [id as string]: deleteField(),
      });
    }

    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    async function fetchDrinkInfo() {
      const drinkDoc = await getDoc(doc(db, "drink", `음료${id}`));
      const drinkData = drinkDoc.data() as Drink;
      console.log(drinkData);

      const storage = getStorage();
      const imageRef = ref(storage, `${drinkData.id}.jpeg`);
      const url = await getDownloadURL(imageRef);

      drinkData.imageUrl = url;
      setDrinkInfo(drinkData);
    }

    fetchDrinkInfo();
  }, [id]);

  if (!drinkInfo) {
    return null;
  }

  return (
    <div className="detailWrapper">
      <SearchArea />
      <div className={styles.detailWrapper}>
        <h3>{drinkInfo.name}</h3>
        <img
          src={drinkInfo.imageUrl}
          className={styles.detailImg}
          alt={drinkInfo.name}
        />
        <AiFillStar
          className={styles.starIco}
          onClick={handleFavoriteClick}
          color={isFavorite ? "#ee7828" : "gray"}
        />
        <div className={styles.infoBox}>
          <div>
            <span>카페인 : </span>
            <span>{drinkInfo.caffeinePer}mg</span>
          </div>
          {/* 해당 아래 영역은 회원에게만 제공하는 기능 */}
          {forMember ? (
            <>
              <DailyValue caffeinePer={drinkInfo.caffeinePer} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Nav selectecdNav="search" />
    </div>
  );
}
