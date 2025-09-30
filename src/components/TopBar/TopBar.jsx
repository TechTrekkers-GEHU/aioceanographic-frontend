import React from 'react';
import styles from './TopBar.module.css';
import { SearchBox } from './SearchBar';
import { LuWaves } from 'react-icons/lu';

const ProfileAvatar = ({ name = "Guest" }) => {
    const initials = name
        .split(" ")
        .map(word => word[0]?.toUpperCase())
        .slice(0, 2)
        .join("");

    return (
        <div className={styles.profileWrapper}>
            <span className={styles.profileName}>{name}</span>
            <div className={styles.avatar}>{initials || "?"}</div>
        </div>
    );
};

const TopBar = () => {
    return (
        <nav className={styles.topBar}>
            <div className={styles.section}>
                <div className={styles.iconWrapper}>
                    <LuWaves className={styles.icon} />
                </div>
                <span className={styles.name}>DeepSea Drive</span>
            </div>
            
            <div className={styles.align}>
                <SearchBox />
            </div>

            <ProfileAvatar name="Research Team" />
        </nav>
    );
};

export default TopBar;
