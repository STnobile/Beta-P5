import React from "react";
import styles from "../styles/Avatar.module.css";
import defaultAvatar from "../assets/logo.png";

const Avatar = ({ src, height = 35, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src || defaultAvatar}
        height={height}
        width={height}
        alt="avatar"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = defaultAvatar;
        }}
      />
      {text}
    </span>
  );
};

export default Avatar;
