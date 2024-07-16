import React, { useEffect, useState } from "react";
import styles from "../cdn/css/index.module.css";

function Index() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetch("/messages.json")
        .then(response => response.json())
        .then(response => setSections(response));

        let currentSection = 0;

        function scrollToSection(index) {
            document.querySelectorAll('section').forEach((section, i) => {
                if (i === index) {
                    section.style.height = `100vh`;
                } else {
                    section.style = ``;
                }
                
            });
        }

        scrollToSection(currentSection);

        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0 && currentSection < document.querySelectorAll('section').length - 1) {
                currentSection++;
                scrollToSection(currentSection);
            } else if (event.deltaY < 0 && currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
        });
    }, []);

    return (<div className={styles.root}>
        <section className={`${styles.presentation} ${styles.section}`}>
            <h1>Cette page est un mémorial pour Doc Gamer.</h1>
            <h2>Ici sont regrouper tous les messages de ses abonnées</h2>
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
    </div>)
}

export default Index;