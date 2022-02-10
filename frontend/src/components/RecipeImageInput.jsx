import React, { useState, useEffect } from 'react';
import styles from '../styles/RecipeImageInput.module.css';

export default function RecipeImageInput() {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    if (image == null) return;
    const newImageURL = null;
    newImageURL.push(URL.createObjectURL(image));
    setImageURL(newImageURL);
  }, [image]);

  function onImageChange(e) {
    setImage([...e.target.files]);
  }

  return (
    <div className={styles.imageInputContainter}>
      <input type="file" accept="image/*" onChange={onImageChange} />
      <img src={imageURL} alt="uploaded" />
    </div>
  );
}
