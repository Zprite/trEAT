import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from '../styles/RecipeBody.module.css';
import IngredientsView from './IngredientsView';
// import { UserContext } from '../context/UserContext';

export default function RecipeBody({ recipeObject }) {
  const widthBreakpoint = 900;
  const dishTitle = recipeObject.title;
  const descriptionText = recipeObject.description;
  const durationTime = recipeObject.duration;
  const markdownSource = recipeObject.stepsMarkdown;

  // const [user] = useContext(UserContext);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({

        height: window.innerHeight,
        width: window.innerWidth,

      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const renderIngredients = () => ((dimensions.width < widthBreakpoint) ? (
    <div className={cn(styles.ingredientsContainer, 'white')}>
      <hr />
      <h2 className={styles.ingredientsHeader}>Ingredients</h2>
      <IngredientsView recipeObject={recipeObject} />
      {' '}
    </div>
  ) : null);

  return (
    <div className={cn(styles.recipeBodyContainer, 'white')}>
      <h1 id="recipeTitle">
        {dishTitle}
      </h1>
      <p className={styles.recipeDescription}>
        {descriptionText}
      </p>
      <div className={styles.madeByContainer}>
        <div>Laget av:</div>
        <Link to={`/profile/${recipeObject.username}`} className={styles.userProfileLink}>
          {recipeObject.username}
        </Link>
      </div>
      {renderIngredients()}
      <div className={styles.timeEstimateOuter}>
        <hr className="divider" />
        <div className={styles.timeEstimateContainer}>
          <svg className={styles.icon} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z" /></svg>
          <div id="timeEstimateText" className={styles.timeEstimateText}>
            {`${durationTime} min`}
          </div>
        </div>
        <hr className="divider" />
      </div>
      <MarkdownPreview className={styles.recipeMarkdown} source={markdownSource} />
    </div>
  );
}
