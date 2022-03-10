/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import styles from '../styles/RecipeImageInput.module.css';

export default function RecipeImageInput({ image, setImage }) {
  const [imageURL, setImageURL] = useState();

  const resetImage = () => {
    setImage(null);
    setImageURL(null);
  };

  useEffect(() => {
    if (!image) {
      return;
    }
    setImage(image);

    setImageURL(URL.createObjectURL(image));
  }, [image, setImage]);

  function onImageChange(e) {
    setImage(e.target.files[0]);
  }

  function deleteButton() {
    if (image) {
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
            backgroundImage: `url(${imageURL})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.plusButton}>{image ? ' ' : '+' }</div>
          <div className={styles.addImageLabelText}><div>{image ? '' : 'Add Image...'}</div></div>
        </div>
      </label>
      <input className={styles.imageInput} type="file" name="file" id="file" accept="image/*" onChange={onImageChange} />
      {deleteButton()}
    </div>

  );
}
