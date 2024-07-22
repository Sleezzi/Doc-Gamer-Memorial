import React, { useEffect, useState } from "react";
import styles from "../cdn/css/index.module.css";

function Index({ theme, setTheme }) {
    const [sections, setSections] = useState([]);
    const [currentSection, setCurrentSection] = useState(-1);
    const [imageIndex, setImageIndex] = useState(0);
    
    useEffect(() => {
        fetch("/messages.json")
        .then(response => response.json())
        .then(response => {
            setSections(response);
            setCurrentSection(0);
        });
    }, []);
    
    useEffect(() => {
        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0 && currentSection < document.querySelectorAll("section").length-1) {
                setCurrentSection(currentSection + 1);
            } else if (event.deltaY < 0 && currentSection > 0) {
                setCurrentSection(currentSection - 1);
            }
        }); 
        document.querySelectorAll("section").forEach((section, i) => {
            if (i === currentSection) {
                section.style.height = `100vh`;
            } else {
                section.style = ``;
            }
        });
    }, [currentSection, document.querySelectorAll("section").length]);
    
    const isMobile = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (
            /android/i.test(userAgent) || 
            (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || 
            /windows phone/i.test(userAgent)
        ) {
            return true;
        }
        return window.innerWidth <= 800 && window.innerHeight <= 600;
    }
    
    const handleClick = (e) => {
        if (isMobile()) return;
        if (document.getElementById(styles.sound).isPlaying) return;
        const soundlist = [
            "/cdn/audio/Wow.mp3",
            "/cdn/audio/Huh.mp3",
            "/cdn/audio/RIZZ.mp3",
            "/cdn/audio/Shocked.mp3",
            "/cdn/audio/AAAAUUUGHHHH.mp3",
            "/cdn/audio/Whip.mp3",
        ]
        document.getElementById(styles.sound).volume = .25;
        document.getElementById(styles.sound).src = "";
        const img = e.target;
        img.classList.add(styles.fade);
        
        img.addEventListener("transitionend", () => {
            if (imageIndex === 3) {
                setImageIndex(0);
            } else {
                document.getElementById(styles.sound).src = soundlist[Math.floor(Math.random() * soundlist.length)];
                setImageIndex(imageIndex+1);
            }
            if (img.classList.contains(styles.fade)) img.classList.remove(styles.fade);
        }, { once: true });
    }
    
    return (<div className={styles.root}>
        <section className={styles.presentation}>
            <button className={styles.theme}>
                <img src={`/cdn/img/icon/${theme === "dark" ? "dark" : "light"}.png`} alt="Theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
            </button>
            <div>
                <h1>Doc Gamer</h1>
                <h2>Ici sont regroupés tous les messages de ses abonnés</h2>
            </div>
            <div class={styles.imageContainer}>
                <img className={styles.logo} onClick={handleClick} src={imageIndex === 0 ? "https://cdn.discordapp.com/avatars/595272750021476362/4ea06435b98c7d2b6ad164091bf0f474.png?size=1024" : `/cdn/img/doc_${imageIndex}.png`} alt="Avatar de Doc Gamer" />
            </div>
            <p>Site fait par<a href="http://sleezzi.fr" target="_blank" rel="noopener noreferrer">Sleezzi</a></p>
        </section>
        {
            sections.map((message) =>
                <section className={styles.section} key={message.name} id={message.name.toLowerCase()}>
                    <img src={message.avatar || "/cdn/img/icon/avatar.png"} className={styles.avatar} alt={`Avatar de ${message.name}`} />
                    <div>
                        <h1>{message.name}</h1>
                        <h3>{message.message}</h3>
                    </div>
                </section>
            )
        }
        <section className={`${styles.section} ${styles.end}`}>
            <h2>Tqt à la fin de ta prépa tu sauras gérer tes revenus Twitch et ta YouTube money</h2>
        </section>
        <div className={styles.buttons}>
            <button id={styles.up} style={{display: (currentSection === 0 ? "none" : "unset")}} onClick={() => {
                if (currentSection === 0) return;
                setCurrentSection(currentSection - 1);
            }}>
                ↑
            </button>
            <button id={styles.down} style={{display: (currentSection === document.querySelectorAll("section").length - 1 ? "none" : "unset")}} onClick={() => setCurrentSection(currentSection + 1)}>
                ↓
            </button>
        </div>
        <audio autoPlay id={styles.sound} />
    </div>);
}

export default Index;