import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => { }]);

const initialState = {};

function UserProvider({ children }) {
  const [state, setState] = useState(initialState);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
