import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import RecipeImageInput from '../components/RecipeImageInput';
import RecipeTitleInput from '../components/RecipeTitleInput';
import RecipeTimeInput from '../components/RecipeTimeInput';
import '../styles/globals.css';
import styles from '../styles/create.module.css';
import RecipeDescriptionInput from '../components/RecipeDescriptionInput';
import RecipeIngredientsInput from '../components/RecipeIngredientsInput';
import RecipeStepsMarkdown from '../components/RecipeStepsMarkdown';
import NavBar from '../components/NavBar';
import AuthWrapper from '../components/AuthWrapper';

export default function Create() {
  const [markdownData, setMarkdownData] = useState();
  const [ingredientsData, setIngredientsData] = useState();
  const [imageData, setImageData] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [imageError, setImageError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [markdownError, setMarkdownError] = useState(false);

  useEffect(() => {
    setImageError(imageData == null);
  }, [imageData]);

  useEffect(() => {
    if (ingredientsData == null) {
      setIngredientsError(true);
      return;
    }
    setIngredientsError(ingredientsData.length < 1);
  }, [ingredientsData]);

  useEffect(() => {
    if (markdownData == null) {
      setMarkdownError(true);
      return;
    }
    setMarkdownError(markdownData.length < 1 || markdownData.length > 4000);
  }, [markdownData]);

  const navigate = useNavigate();

  const submitMainData = (refData, imagePath) => {
    const data = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(refData)) {
      data[key] = value;
    }

    data.stepsMarkdown = markdownData;
    data.ingredients = ingredientsData;
    data.imagePath = imagePath;

    // console.log(data);
    const json = JSON.stringify(data);

    axios({
      method: 'post',
      url: 'http://localhost:8000/recipes/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: json,
    })
      .then((response) => {
        // handle success
        console.log(response);
        navigate('/');
      })
      .catch((response) => {
        // handle error
        console.log(response);
      });
  };

  const onFormSubmit = (refData) => {
    if (ingredientsError || markdownError || imageError) {
      return;
    }

    // Form containing image file
    const formData = new FormData();
    formData.append('file', imageData);
    // Post image to public folder of the server

    axios({
      method: 'post',
      url: 'http://localhost:8000/imageUpload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        // handle success
        console.log(response);
        const imagePath = response.data;
        submitMainData(refData, imagePath);
      })
      .catch((response) => {
        // handle error
        console.log(response);
        submitMainData(refData, null);
      });
  };
  // On UseForm errors
  const onErrors = (error) => console.error(error);

  const getMarkdownData = (data) => {
    setMarkdownData(data);
  };

  const getIngredientsData = (data) => {
    setIngredientsData(data);
  };

  const getImageData = (data) => {
    setImageData(data);
  };

  return (
    <AuthWrapper>
      <div>
        <NavBar />
        <div className="centeredPageWrapper">
          <Header title="Create recipe" />
          <form className="recipeCreator" onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <RecipeImageInput passData={getImageData} />
            <div className={styles.timeTitleContainer}>
              <RecipeTitleInput register={register} />
              <RecipeTimeInput register={register} />
            </div>
            <RecipeDescriptionInput register={register} />
            <RecipeIngredientsInput passData={getIngredientsData} />
            <RecipeStepsMarkdown register={register} passData={getMarkdownData} />
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
            </div>
            <button type="submit" value="Submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}
