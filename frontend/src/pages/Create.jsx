import React, {
  useState, useContext, useEffect,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
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
import { deleteRecipeRequest, editRecipeRequest, newGetRecipeRequest } from '../requests/editRecipe';
import UserCredentialsView from '../components/UserCredentialsView';

export default function Create({ editMode }) {
  // State that cannot be handled by react-hook-form
  const [markdownData, setMarkdownData] = useState();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [oldRecipe, setOldRecipe] = useState();

  // React-hook-form functions
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm();

  const [userContext] = useContext(UserContext);

  // Error variables
  const [imageError, setImageError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [markdownError, setMarkdownError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [userIsAuthorized, setUserIsAuthorized] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const verifyUser = () => {
    if (userContext.details && oldRecipe) {
      setUserIsAuthorized(userContext.details._id === oldRecipe.userID
         || userContext.details.admin);
    }
  };

  useEffect(() => {
    verifyUser();
  });

  const fetchOldRecipe = async () => {
    const { result, error } = await newGetRecipeRequest(userContext.token, id);
    if (error) {
      console.log('error getting recipe: ', error);
      navigate(`/recipe/${id}`);
    } else {
      console.log('old recipe: ', result.data.data);
      setOldRecipe(result.data.data);
      verifyUser();
    }
  };

  const setFormValues = () => {
    setValue('title', oldRecipe.title);
    setValue('description', oldRecipe.description);
    setValue('duration', oldRecipe.duration);
    setMarkdownData(oldRecipe.stepsMarkdown);
    setImageURL(oldRecipe.imagePath);
    console.log('ingredients:', oldRecipe.ingredients);
    setIngredientsData(oldRecipe.ingredients);
  };

  useEffect(() => {
    if (editMode) fetchOldRecipe();
  }, []);

  useEffect(() => {
    if (oldRecipe) setFormValues();
  }, [oldRecipe]);

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

  const putRecipeData = async (refData, imagePath) => {
    const data = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(refData)) {
      data[key] = value;
    }

    data.stepsMarkdown = markdownData;
    data.ingredients = ingredientsData;
    data.imagePath = imagePath;

    const json = JSON.stringify(data);

    const { error } = await editRecipeRequest(userContext.token, json, id);
    if (!error) navigate('/');
    else setServerError(true);
  };

  const handlePostRecipe = async (img, formData) => {
    const { error, response } = await newRecipeImageRequest(userContext.token, img);
    if (!error) postRecipeData(formData, response.data);
    else postRecipeData(formData, null);
  };

  const handleEditRecipe = async (img, formData) => {
    if (editMode && imageURL && imageURL === oldRecipe.imagePath) {
      putRecipeData(formData, imageURL);
    } else {
      const { error, response } = await newRecipeImageRequest(userContext.token, img);
      if (!error)putRecipeData(formData, response.data);
      else putRecipeData(formData, null);
    }
  };

  const handleDeleteRecipe = async (e) => {
    e.preventDefault();
    const { error, response } = await deleteRecipeRequest(userContext.token, id);
    console.log('Delete response: ', response);
    if (!error) navigate('/');
    else console.error('error deleting: ', error);
  };

  // Called by react-hook-form on submit. formData is given when
  // called, and is the state of all inputs
  const onFormSubmit = (formData) => {
    if (ingredientsError || markdownError || imageError) {
      return;
    }
    if (!editMode)handlePostRecipe(image, formData);
    else handleEditRecipe(image, formData);
  };
  // On UseForm errors
  const onErrors = (error) => console.error(error);

  // ERROR HANDLING
  useErrorOnEmpty(markdownData, setMarkdownError);
  useErrorOnEmpty(ingredientsData, setIngredientsError);
  useErrorOnEmpty(imageURL, setImageError);

  return (
    <AuthWrapper>
      <div>
        <NavBar />
        <UserCredentialsView hidden />
        {(userIsAuthorized || !editMode)
        && (
        <div className="centeredPageWrapper">
          <Header title="Create recipe" />
          <form className="recipeCreator" onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <RecipeImageInput
              image={image}
              setImage={setImage}
              imageURL={imageURL}
              setImageURL={setImageURL}
            />
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
            {editMode && <button type="button" onClick={handleDeleteRecipe} className={cn(styles.submitButton, styles.deleteButton)}>DELETE RECIPE</button>}
          </form>
        </div>
        )}
        {!userIsAuthorized && editMode && (<p>Unauthorized to edit this recipe</p>)}
      </div>
    </AuthWrapper>
  );
}
