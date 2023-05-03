import styles from "../assets/css/Nav.module.css";
import { AiFillHome } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

export default function Nav() {
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
          <BiLogIn className={styles.icon} />
          <span>LOGIN</span>
        </div>
      </div>
    </div>
  );
}
