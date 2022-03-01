import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function UserCredentialsView() {
  const [userContext, setUserContext] = useContext(UserContext);
  const DEBUG = false;

  const fetchUserDetails = useCallback(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:8000/users/me',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`,
        },
        withCredentials: 'include',
      })
        .then(async (response) => {
        // handle success
          console.log('Credentials fetch response:', response);
          setUserContext((oldValues) => ({ ...oldValues, details: response.data }));
        })
        .catch((response) => {
        // handle error
          if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
            window.location.reload();
          } else {
            setUserContext((oldValues) => ({ ...oldValues, details: null }));
          }
        });
    },
    [setUserContext, userContext.token],
  );

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return (
    !userContext.details ? (
      <div>Loading Credentials</div>
    ) : (
      <div>
        <h2>{`Welcome ${userContext.details.fullName}`}</h2>
        <h3>{`Username: ${userContext.details.username}`}</h3>
        {DEBUG && <h4>{`UserID: ${userContext.details._id}`}</h4>}
      </div>
    )
  );
}
