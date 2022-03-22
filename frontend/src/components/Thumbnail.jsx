import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { FaRegClock, FaStar, FaRegEdit } from 'react-icons/fa';
import styles from '../styles/Thumbnail.module.css';

export default function Thumbnail({
  // put in character limits for heading and description
  title, // no more than two lines
  image,
  duration,
  rating,
  description,
  link, // 150 characters?
}) {
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    const value = 0; // dont know how to check backend url ends in /me
    if (value === 1) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, []);

  return (
    <div className={cn(styles.box, 'elementBackground')}>
      <div className={styles.separatorBox}>
        <Link className={styles.link} to={link}>
          <div id="heading">
            <h1>{title}</h1>
          </div>
          <img className={styles.thumbnailImage} src={image} alt="" />
          <div className={styles.tinyFacts}>
            <div>
              <div id="clock"><FaRegClock /></div>
              <div id="duration">{duration}</div>
            </div>
            <div>
              <div id="star"><FaStar /></div>
              <div id="rating">{rating}</div>
            </div>
          </div>
          <p id="rating">{description}</p>
        </Link>
        <div className={`${isMyProfile ? styles.linkBox : styles.noLinkBox}`}>
          <Link className={styles.editLink} to="/create">
            <div className={styles.editIcon}>
              <FaRegEdit />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

Thumbnail.defaultProps = {
  title: 'Oppskriftsnavn',
  image: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  description: 'Kort beskrivelse av oppskriften',
};
