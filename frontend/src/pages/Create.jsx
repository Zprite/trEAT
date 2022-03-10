import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
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
import useErrorOnEmpty from '../hooks/useErrorOnEmpty';
import RecipeFormErrors from '../components/RecipeFormErrors';
import { newRecipeImageRequest, newRecipeRequest } from '../requests/createRecipe';

export default function Create() {
  // State that cannot be handled by react-hook-form
  const [markdownData, setMarkdownData] = useState();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [image, setImage] = useState();

  // React-hook-form functions
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [userContext] = useContext(UserContext);

  // Error variables
  const [imageError, setImageError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [markdownError, setMarkdownError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();

  const postRecipeData = async (refData, imagePath) => {
    const data = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(refData)) {
      data[key] = value;
    }

    data.stepsMarkdown = markdownData;
    data.ingredients = ingredientsData;
    data.imagePath = imagePath;

    const json = JSON.stringify(data);

    const { error } = await newRecipeRequest(userContext.token, json);
    if (!error) navigate('/');
    else setServerError(true);
  };

  const handlePostRecipe = async (img, formData) => {
    const { error, response } = await newRecipeImageRequest(userContext.token, img);
    if (!error) postRecipeData(formData, response.data);
    else postRecipeData(formData, null);
  };

  // Called by react-hook-form on submit. formData is given when
  // called, and is the state of all inputs
  const onFormSubmit = (formData) => {
    if (ingredientsError || markdownError || imageError) {
      // TODO: give feedback that you cannot submit when there is an error
      return;
    }

    handlePostRecipe(image, formData);
  };
  // On UseForm errors
  const onErrors = (error) => console.error(error);

  // === ERROR HANDLING
  useErrorOnEmpty(markdownData, setMarkdownError);
  useErrorOnEmpty(ingredientsData, setIngredientsError);
  useErrorOnEmpty(image, setImageError);

  return (
    <AuthWrapper>
      <div>
        <NavBar />
        <div className="centeredPageWrapper">
          <Header title="Create recipe" />
          <form className="recipeCreator" onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <RecipeImageInput image={image} setImage={setImage} />
            <div className={styles.timeTitleContainer}>
              <RecipeTitleInput register={register} />
              <RecipeTimeInput register={register} />
            </div>
            <RecipeDescriptionInput register={register} />
            <RecipeIngredientsInput
              ingredients={ingredientsData}
              setIngredients={setIngredientsData}
            />
            <RecipeStepsMarkdown
              register={register}
              value={markdownData}
              setValue={setMarkdownData}
            />
            <RecipeFormErrors
              errors={errors}
              imageError={imageError}
              ingredientsError={ingredientsError}
              markdownError={markdownError}
              serverError={serverError}
            />
            <button type="submit" value="Submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}
