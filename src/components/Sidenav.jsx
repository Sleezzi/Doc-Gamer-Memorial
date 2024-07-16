import styles from "../cdn/css/sidenav.module.css";
import { Link } from "react-router-dom";

function Sidenav({ profile }) {
    return (
        <div id={styles.sidenav}>
            <div className={styles.buttonContainer}>
                <Link to="/crate">
                    <img src="/cdn/img/icon/crate.png" alt="" />
                    <h4>Crate</h4>
                </Link>
                <Link to="/shop">
                    <img src="/cdn/img/icon/shop.png" alt="" />
                    <h4>Shop</h4>
                </Link>
                <Link to="/black-market">
                    <img src="/cdn/img/icon/dollar.png" alt="" />
                    <h4>Black Market</h4>
                </Link>
                <Link to="/gift">
                    <img src="/cdn/img/icon/gift.png" alt="" />
                    <h4>Gift</h4>
                </Link>
                <Link to="/inventory">
                    <img src="/cdn/img/icon/backpack.png" alt="" />
                    <h4>Inventory</h4>
                </Link>
            </div>
            <div className={styles.profile}>
                <img src={profile.avatar} alt={`${profile.username}'s avatar`} />
                <div>
                    <code>{profile.username}</code>
                    <div className={styles.level}>
                        <div style={{width: `${profile.level[0] / profile.level[1] * 100}%`}} className={styles.progressbar}></div>
                        <div className={styles.levelText}>{profile.level[0]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidenav;