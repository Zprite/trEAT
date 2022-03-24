import axios from 'axios';

const newUserCredentialsRequest = async (userToken) => {
  let result; let
    err;
  try {
    result = await axios({
      method: 'get',
      url: 'http://localhost:8000/users/me/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      withCredentials: 'include',
    });
  } catch (e) {
    err = e;
  }
  return { result, err };
};

// eslint-disable-next-line import/prefer-default-export
export { newUserCredentialsRequest };
