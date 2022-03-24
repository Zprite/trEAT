import axios from 'axios';

const deleteUser = async (accessToken, userID) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `http://localhost:8000/user/id/${userID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: 'include',
    });

    return response;
  } catch (err) {
    return 0;
  }
};

export default deleteUser;
