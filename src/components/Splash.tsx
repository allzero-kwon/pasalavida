import { useEffect, useState } from "react";
import styles from "./Splash.module.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface SplashProps {
    id: string;
    title: string;
    date?: string;
    splashMode? : string;
    eventDetail?: string;
    fadeOut: boolean;
    mainColor?: string;
}

const Splash: React.FC<SplashProps> = ({ id, title, date, eventDetail, fadeOut, mainColor, splashMode }) => {

    const [mode, setMode] = useState("");

    useEffect(() => {
        console.log('video',id)
        setMode(splashMode || "default")
    }, [splashMode]);

    return mode == "default" ? (
        <div id="all_splash_wrapper" className={styles.sp_theme_purple}>
            <div className={`${styles.splash} ${styles.trans} animate__animated ${fadeOut ? 'animate__fadeOut' : ''}`}>
                <video 
                    className={styles.bgVideo}
                    poster={`/assets/${id}/main/splash.webp`}
                    src={`/assets/${id}/main/splash.mp4`}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    />
                <div className={styles.dim} />
                <div className={styles.overlay}>    
                    <div className={styles.ct}>
                        <div className={styles["lds-heart"]}><div></div></div>
                        <div style={{ lineHeight: "20px", color: "#fff", marginTop: "10px" }}>
                            <div className="typing">{title}</div>
                        </div>
                    </div>
                    <div className={`${styles.btext} animate__fadeIn`}>
                        {date}
                        <br />
                        {eventDetail}
                    </div>
                </div>
            </div>
        </div>
    ) : (<div id="all_splash_wrapper" className={styles.sp_theme_purple}>
            <div className={`${styles.splash} ${styles.trans} animate__animated ${fadeOut ? 'animate__fadeOut' : ''}`}
             style={{ backgroundColor: mainColor, opacity:1.0 }}>
            <DotLottieReact
            src="https://lottie.host/be647fdf-d6b4-4f2e-9453-da7ad9c7b404/8DXNrknVbP.lottie"
            loop
            autoplay
            style={{width:"80vw"}}
            />
        </div>
        </div>);
};

export default Splash;