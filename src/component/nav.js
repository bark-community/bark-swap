import React from 'react';
import { QrCode, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import styles from './nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src='/bark-swap-white-logo.svg' alt='logo' />
            </div>
            <div className={styles.icons}>
                <span>
                    <Search sx={{ height: 24, marginRight: 5 }} />
                </span>
                <span>
                    <QrCode sx={{ height: 24, marginRight: 5 }} />
                </span>
                <Avatar sx={{ height: 40, width: 40, border: '1px solid white' }} src='/logo.png' alt="Profile Picture" />
            </div>
        </nav>
    );
}
