import React from 'react';
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
  return (
    <div className={styles.box}>
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
        <div className={styles.editIcon}>
          <FaRegEdit />
        </div>
      </Link>
    </div>
  );
}

Thumbnail.defaultProps = {
  title: 'Oppskriftsnavn',
  image: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  description: 'Kort beskrivelse av oppskriften',
};
