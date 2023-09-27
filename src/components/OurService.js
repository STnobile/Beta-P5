import React from 'react';
import styles from '../styles/OurService.module.css';

const OurServices = () => {
    return (
        <section className={styles.service}>
            <div className={styles.title}>
                <h3>Our Services</h3>
            </div>
            <div className={styles.boxCardService}>
                <div className={styles.cardService}>
                    <i className="fa-solid fa-building-columns"></i>
                    <h4 className={styles.footerH4}>Collection</h4>
                    <div className={styles.contService}>
                        <p>
                            As the main goal we have providing our visitors the greatest 
                            experience you can get. We are eager to show you everything and 
                            help you discover our history in a very interesting way.
                        </p>
                    </div>
                </div>
                <div className={styles.cardService}>
                    <i className="fa-brands fa-wpexplorer"></i>
                    <h4 className={styles.footerH4}>Explore</h4>
                    <div className={styles.contService}>
                        <p>
                            Our court is open to everyone who is passionate about
                            the history of winemaking but also to the people
                            who want to spend some time immersed in history and local culture.
                        </p>
                    </div>
                </div>
                <div className={styles.cardService}>
                    <i className="fa-regular fa-circle"></i>
                    <h4 className={styles.footerH4}>Circle</h4>
                    <div className={styles.contService}>
                        <p>
                            Due to this place's historical background, 
                            we would like to kindly remind you to take care of the area 
                            surrounding you and show your respect towards the others.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurServices;
