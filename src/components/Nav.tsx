import styles from "../assets/css/Nav.module.css";
import { useState, useEffect } from "react";
import { AiFillHome, AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { auth } from "../Firebase";

export default function Nav() {
  const [logIn, setLogin] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLogin(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className={styles.navContainer}>
        <div className={styles.navItem}>
          <AiFillHome className={styles.icon} />
          <span>HOME</span>
        </div>
        <div className={styles.navItem}>
          <AiFillStar className={styles.icon} />
          <span>FAVORITE</span>
        </div>
        <div className={styles.navItem}>
          <AiOutlineSearch className={styles.icon} />
          <span>SEARCH</span>
        </div>
        <div className={styles.navItem}>
          {logIn ? (
            <>
              <button onClick={handleLogout}>
                <BiLogOut className={styles.icon} />
              </button>
              <span>LOGOUT</span>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>
                <BiLogIn className={styles.icon} />
                <span>LOGIN</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
