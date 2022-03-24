import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { FaRegClock, FaRegEdit } from 'react-icons/fa';
import styles from '../styles/Thumbnail.module.css';
import { UserContext } from '../context/UserContext';

export default function Thumbnail({
  // put in character limits for heading and description
  title, // no more than two lines
  image,
  duration,
  description,
  id,
  userID,
}) {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [userContext] = useContext(UserContext);
  useEffect(() => {
    if (userContext.details && (userID === userContext.details._id || userContext.details.admin)) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, [userID, userContext]);

  return (
    <div className={cn(styles.box, 'elementBackground')}>
      <div className={styles.separatorBox}>
        <Link className={styles.link} to={`/recipe/${id}`}>
          <img className={styles.thumbnailImage} src={image} alt="" />
          <div id="heading">
            <h1 className={styles.thumbnailTitle}>{title}</h1>
          </div>
          <div className={styles.tinyFacts}>
            <div className={styles.factsContainer}>
              <div id="clock"><FaRegClock /></div>
              <div id="duration">{duration}</div>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
        </Link>

      </div>
      <div className={`${isMyProfile ? styles.linkBox : styles.noLinkBox}`}>
        <Link className={styles.editLink} to={`/recipe/${id}/edit`}>
          <div className={styles.editIcon}>
            <FaRegEdit />
          </div>
        </Link>
      </div>
    </div>
  );
}

Thumbnail.defaultProps = {
  title: 'Oppskriftsnavn',
  image: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  description: 'Kort beskrivelse av oppskriften',
};
