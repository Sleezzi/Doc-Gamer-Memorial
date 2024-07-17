import React, { useEffect, useState } from "react";
import styles from "../cdn/css/index.module.css";

function Index() {
    const [sections, setSections] = useState([]);
    const [currentSection, setCurrentSection] = useState(-1);

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
            if (event.deltaY > 0 && currentSection < sections.length) {
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
    }, [currentSection, sections.length]);

    const playSound = () => {
        const soundlist = [
            "/cdn/audio/Wow.mp3",
            "/cdn/audio/Huh.mp3",
            "/cdn/audio/RIZZ.mp3",
            "/cdn/audio/Shocked.mp3",
            "/cdn/audio/AAAAUUUGHHHH.mp3",
            "/cdn/audio/Whip.mp3",
        ]
        document.getElementById(styles.sound).volume = .25;
        document.getElementById(styles.sound).src = soundlist[Math.floor(Math.random() * soundlist.length)];
        document.getElementById(styles.sound).play();
    }

    return (<div className={styles.root}>
        <section className={styles.presentation}>
            <div>
                <h1>Doc Gamer</h1>
                <h2>Ici sont regroupé tous les messages de ses abonnés</h2>
            </div>
            <img onMouseEnter={playSound} onClick={playSound} src="https://cdn.discordapp.com/avatars/595272750021476362/4ea06435b98c7d2b6ad164091bf0f474.png?size=1024" alt="Avatar de Doc Gamer" />
            <p>Site fait par Sleezzi</p>
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
        <div className={styles.buttons}>
            <button id={styles.up} style={{display: (currentSection === 0 ? "none" : "unset")}} onClick={() => {
                if (currentSection === 0) return;
                setCurrentSection(currentSection - 1);
            }}>
                ↑
            </button>
            <button id={styles.down} style={{display: (currentSection === sections.length ? "none" : "unset")}} onClick={() => setCurrentSection(currentSection + 1)}>
                ↓
            </button>
        </div>
        <audio autoPlay id={styles.sound} />
    </div>)
}

export default Index;