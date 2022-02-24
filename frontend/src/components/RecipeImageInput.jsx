/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import styles from '../styles/RecipeImageInput.module.css';

export default function RecipeImageInput({ passData }) {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const resetImage = () => {
    setImages([]);
    setImageURLs([]);
  };

  useEffect(() => {
    passData(images[0]);
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  function deleteButton() {
    if (images.length >= 1) {
      return <button className={styles.deleteImageButton} type="button" onClick={resetImage}>Remove image</button>;
    }
    return null;
  }

  return (
    <div className={styles.imageInputContainter}>
      <label htmlFor="file">
        <div
          className={styles.labelInner}
          style={{
            backgroundImage: `url(${imageURLs[0]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.plusButton}>{images.length < 1 ? '+' : '' }</div>
          <div className={styles.addImageLabelText}><div>{images.length < 1 ? 'Add Image...' : ''}</div></div>
        </div>
      </label>
      <input className={styles.imageInput} type="file" name="file" id="file" accept="image/*" onChange={onImageChange} />
      {deleteButton()}
    </div>

  );
}
