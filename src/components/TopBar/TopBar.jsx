import React from 'react';
import styles from './TopBar.module.css';
import { LuWaves } from 'react-icons/lu';

const TopBar = () => {
    return (
        <nav className={styles.topBar}>
            <div className={styles.section}>
                <div className={styles.iconWrapper}>
                    <LuWaves className={styles.icon} />
                </div>
                <span className={styles.name}>TextTwistker</span>
            </div>

            <div className={styles.section}></div>

            <div className={styles.section}>
                <button className={styles.linkButton}>Login</button>
                <button className={styles.linkButton}>Help</button>
            </div>
        </nav>
    )
}

export default TopBar;