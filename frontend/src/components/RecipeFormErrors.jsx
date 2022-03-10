import React from 'react';
import '../styles/globals.css';
import styles from '../styles/create.module.css';

export default function RecipeFormErrors({
  errors, imageError, ingredientsError, markdownError, serverError,
}) {
  return (

    <div className={styles.errorMessgeContainer}>

      {(imageError
              && (
                <div className={styles.errorMessage}>
                  Please upload an image with your recipe.
                </div>
              ))}
      {(errors.title
              && (
                <div className={styles.errorMessage}>
                  Please give your recipe a title. Cannot exceed 40 characters
                </div>
              ))}
      {(errors.description && (
      <div className={styles.errorMessage}>
        Please give your recipe a description. Cannot exceed 200 characters.
      </div>
      ))}
      {(ingredientsError
              && (
                <div className={styles.errorMessage}>
                  Please provide one or more ingredients with your recipe.
                </div>
              )
            )}
      {(markdownError
              && (
                <div className={styles.errorMessage}>
                  Please provide recipe steps. Cannot exceed 4000 characters.
                </div>
              )
            )}
      {(serverError
              && (
                <div className={styles.errorMessage}>
                  There was an error connecting to the server. Try again later
                </div>
              )
            )}
    </div>
  );
}
