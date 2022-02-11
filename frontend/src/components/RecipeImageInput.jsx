import React, { useState, useEffect } from 'react';
import styles from '../styles/RecipeImageInput.module.css';

export default function RecipeImageInput() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <div className={styles.imageInputContainter}>
      <input type="file" accept="image/*" onChange={onImageChange} />
      <img className={styles.recipeImage} src={imageURLs[0]} alt="" />
    </div>
  );
}
