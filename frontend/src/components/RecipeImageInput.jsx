/* eslint-disable jsx-a11y/label-has-associated-control */
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
      <label htmlFor="file">
        <div className={styles.labelInner}>
          <div className={styles.plusButton}>+</div>
          <div className={styles.addImageLabelText}><div>Add image...</div></div>
        </div>
      </label>
      <input className={styles.imageInput} type="file" name="file" id="file" accept="image/*" onChange={onImageChange} />
      <img className={styles.recipeImage} src={imageURLs[0]} alt="" />
    </div>
  );
}
