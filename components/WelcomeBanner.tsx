'use client';

import { useEffect, useState } from 'react';

export default function WelcomeBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => setVisible(true), 0);
        const hideTimer = setTimeout(() => setVisible(false), 1800);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: 0,
                zIndex: 50,
                width: 'clamp(300px, 15vw, 800px)',
                transform: visible ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.5s ease-in-out',
            }}
        >
            <img
                src="https://images.plurk.com/6mvlnSn4QPWxBLRHQMEMKk.png"
                alt="welcome"
                style={{
                    width: 'clamp(300px, 15vw, 800px)',
                    height: 'auto'
                }}
            />
        </div>
    );
}