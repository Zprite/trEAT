/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from '../styles/RecipeImageInput.module.css';

export default function RecipeImageInput({
  image, setImage, imageURL, setImageURL,
}) {
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

  return (
    <div className={styles.imageInputContainter}>
      <label htmlFor="file">
        <div
          className={cn(styles.labelInner, 'white')}
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.plusButton}>{imageURL ? ' ' : '+' }</div>
          <div className={styles.addImageLabelText}><div>{imageURL ? '' : 'Add Image...'}</div></div>
        </div>
      </label>
      <input className={styles.imageInput} type="file" name="file" id="file" accept="image/*" onChange={onImageChange} />
      {imageURL
      && <button className={styles.deleteImageButton} type="button" onClick={resetImage}>Remove image</button>}
    </div>

  );
}
