import React from 'react';
import styles from '../styles/MuseoVini.module.css'; // Adjust the path based on your directory structure
import background from '../styles/images/wallwriting.jpg'
import { Image } from 'react-bootstrap';

function MuseoVini() {
    return (
        <section className={styles.container}>
            <div className={styles.imageBox}>
                <Image src={background} alt="entrance of Image" className={styles.image} />
            </div>

            <div className={styles.textBox}>
                <div className={styles.text}>
                    <h1 className={styles.title}>A Living Museum of Sicilian Winemaking</h1>
                    <p>
                        Nobile collection consisting of 120 pieces recognized by the superintendence
                        of cultural heritage of exceptional ethno-anthropological interest.
                        The collection shows the history of the winemaking of Pachino,
                        when everything was done manually and with the help of animals.</p>
                    <p>700's until the arrival of today's electricity.
                        The museum is the only testimony for all of Sicily,
                        because all those madmen tell the complete story from working in the fields of armor preparation to put the cuttings,
                        graft them, produce grapes, harvest them and transport them to the millstone. </p>
                    <p> Cuonzi, taken by hand, then pull it from the underground tanks and measure
                        the must with the quarters to make the price in sarma, the sarma was 96 liters (8 quarts of 12 liters)
                        the price was established and off to sell the wine , to avoid measuring sarma by sarma he invented a cart
                        with 8 half-sarma barrels each and in all he carried 4 sarme and he bought and sold carts.</p>
                </div>
            </div>
        </section>
    );
}

export default MuseoVini;
