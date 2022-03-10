import axios from 'axios';

const newRecipeRequest = async (userToken, data) => {
  let result; let
    err;
  try {
    result = await axios({
      method: 'post',
      url: 'http://localhost:8000/recipes/',
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

const newRecipeImageRequest = async (userToken, img) => {
  const formData = new FormData();
  formData.append('file', img);

  let error;
  let response;

  try {
    response = await axios({
      method: 'post',
      url: 'http://localhost:8000/imageUpload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userToken}` },
    });
  } catch (e) {
    error = e;
  }

  return { error, response };
};

export { newRecipeRequest, newRecipeImageRequest };
