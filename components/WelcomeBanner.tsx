'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
            <Image
                src="https://images.plurk.com/2oRuvbqHiPxpspdjR1XbXD.png"
                alt="welcome"
                width={900}
                height={900}
                style={{
                    width: 'clamp(300px, 15vw, 800px)',
                    height: 'auto'
                }}
            />
        </div>
    );
}