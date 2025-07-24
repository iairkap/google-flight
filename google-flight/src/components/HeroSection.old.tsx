// src/components/HeroSection.tsx
import React from 'react';
import styles from '@/styles/HeroSection.module.css';

interface Props {
    children: React.ReactNode;
}

const HeroSection: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <h1 className={styles.title}>Flights</h1>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default HeroSection;