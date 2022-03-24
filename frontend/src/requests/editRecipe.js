import axios from 'axios';

const editRecipeRequest = async (userToken, data, recipeID) => {
  let result; let
    err;
  try {
    result = await axios({
      method: 'put',
      url: `http://localhost:8000/recipe/${recipeID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      data,
    });
  } catch (e) {
    err = e;
  }
  return { result, err };
};

const deleteRecipeRequest = async (userToken, recipeID) => {
  let result; let
    err;
  try {
    result = await axios({
      method: 'delete',
      url: `http://localhost:8000/recipe/${recipeID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (e) {
    err = e;
  }
  return { result, err };
};

const newGetRecipeRequest = async (userToken, recipeID) => {
  let result; let err;
  try {
    result = await axios({
      method: 'get',
      url: `http://localhost:8000/recipe/${recipeID}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (e) {
    err = e;
  }
  return { result, err };
};

export { newGetRecipeRequest, editRecipeRequest, deleteRecipeRequest };
