import styles from "../assets/css/Nav.module.css";
import { useState, useEffect } from "react";
import { AiFillHome, AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import cx from "clsx";

interface NavProps {
  selectecdNav: string;
}

export default function Nav(props: NavProps) {
  const [logIn, setLogin] = useState(false);
  const [isSelected, setIsSelected] = useState(props.selectecdNav);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, [auth]);

  return (
    <div>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.styleNone}>
          <div
            className={cx(styles.navItem, {
              [styles.selected]: isSelected === "home",
            })}
            onClick={() => setIsSelected("home")}
          >
            <AiFillHome className={styles.icon} />
            <span>HOME</span>
          </div>
        </Link>
        <Link to="/favorite" className={styles.styleNone}>
          <div
            className={cx(styles.navItem, {
              [styles.selected]: isSelected === "favorite",
            })}
            onClick={() => setIsSelected("favorite")}
          >
            <AiFillStar className={styles.icon} />
            <span>FAVORITE</span>
          </div>
        </Link>
        <Link to="/search" className={styles.styleNone}>
          <div
            className={cx(styles.navItem, {
              [styles.selected]: isSelected === "search",
            })}
            onClick={() => setIsSelected("search")}
          >
            <AiOutlineSearch className={styles.icon} />
            <span>SEARCH</span>
          </div>
        </Link>
        <div className={styles.navItem}>
          {logIn ? (
            <>
              <Link to="/myinfo" className={styles.styleNone}>
                <div
                  className={cx(styles.navItem, {
                    [styles.selected]: isSelected === "myinfo",
                  })}
                  onClick={() => setIsSelected("myinfo")}
                >
                  <BsFillPersonFill className={styles.icon} />
                  <span>MY INFO</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.styleNone}>
                <div
                  className={cx(styles.navItem, {
                    [styles.selected]: isSelected === "login",
                  })}
                  onClick={() => setIsSelected("login")}
                >
                  <BiLogIn className={styles.icon} />
                  <span>LOGIN</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
