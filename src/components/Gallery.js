import React from "react";
import styles from "../styles/Gallery.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Gallery = () => {
    const currentUser = useCurrentUser();

        const galleryImages = [
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694458797/media/images/Pol_Roger_xz9ywh.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694425334/media/images/hero3_qlzgwv.jpg', title: 'Placeholder Image 2' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694858489/media/images/blue_label_ll_x3hba0.jpg', title: 'Placeholder Image 2' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1693921307/discovery.jpg', title: 'Placeholder Image 3' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694438404/media/images/DYQUEEM_qllhyq.jpg', title: 'Placeholder Image 4' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694438404/media/images/DYQUEEM_qllhyq.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694858692/media/images/WhatsApp_Image_2022-04-26_at_3.02.16_PM_1_mgqeey.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694458797/media/images/Pol_Roger_xz9ywh.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694425334/media/images/hero3_qlzgwv.jpg', title: 'Placeholder Image 5' },
            { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
            // { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
            // { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
            // { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
            // { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694458797/media/images/Pol_Roger_xz9ywh.jpg', title: 'Placeholder Image 5' },
            // { url: 'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1695836041/media/images/0_0_m5r1pk.jpg', title: 'Placeholder Image 5' },
        ];
        

    const displayedImages = currentUser ? galleryImages : galleryImages.slice(0, 3);

    const getFrameStyle = (index) => {
        switch (index % 3) {
            case 0:
                return styles.frameSmall;  
            case 1:
                return styles.frameMedium; 
            case 2:
                return styles.frameLarge;  
            default:
                return styles.frameSmall;
        }
    };

    return (
        <div>
            <div className={styles.galleryContainer}>
                {displayedImages.map((image, index) => (
                    <div key={image.id} className={`${styles.row} ${getFrameStyle(index)}`}>
                        <div className={`${styles.imageFrame}`}>
                            <img src={image.url} alt={image.title} />
                        </div>
                    </div>
                ))}
            </div>
            {!currentUser && (
                <p>Please <a href="/signin">log in</a> to see more images.</p>
            )}
        </div>
    );
};

export default Gallery;
