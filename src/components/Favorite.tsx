import styles from "../assets/css/Favorite.module.css";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { AiFillStar } from "react-icons/ai";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

interface Drink {
  name: string;
  caffeinePer: number;
  imageUrl: string;
  id: number;
}

export default function Favorite() {
  const [favorite, SetFavorite] = useState<Drink[]>([]);
  const navigate = useNavigate();

  const auth = getAuth();

  async function getFavorite() {
    const user = auth.currentUser;
    if (!user) {
      navigate("/canYouJoinUs");
      return;
    }

    const favoriteDocRef = doc(db, "favorite", user.uid);
    const favoriteSnap = await getDoc(favoriteDocRef);
    if (favoriteSnap.exists()) {
      const favoriteData = favoriteSnap.data();
      const favoriteList: Drink[] = Object.keys(favoriteData).map((key) => ({
        ...favoriteData[key],
        id: parseInt(key),
      }));
      SetFavorite(favoriteList);
    } else {
      console.log("No such document!");
    }
  }

  const handelDelteFav = async (id: number) => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/canYouJoinUs");
      return;
    }

    const uid = user?.uid;
    const favoriteDocRef = doc(db, "favorite", uid);
    await updateDoc(favoriteDocRef, {
      [id as number]: deleteField(),
    });
    SetFavorite((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== Number(id))
    );
  };

  const handleClick = (id: number) => {
    handelDelteFav(id);
  };

  useEffect(() => {
    getFavorite();
  }, []);

  if (!favorite) {
    return null;
  }

  return (
    <div className={styles.contentWrapper}>
      {favorite.map((favorite) => (
        <div className={styles.drinkItem} key={favorite.name}>
          <img
            src={favorite.imageUrl}
            alt={favorite.name}
            className={styles.circleImg}
          />
          <AiFillStar
            className={styles.favoriteIcon}
            color="#ee7828"
            onClick={() => handleClick(favorite.id)}
          />
          <Link to={`/drink/${favorite.id}`}>
            <div className={styles.infoArea}>
              <p className={styles.name}>{favorite.name}</p>
              <span>카페인</span>
              <span>{favorite.caffeinePer}mg</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
