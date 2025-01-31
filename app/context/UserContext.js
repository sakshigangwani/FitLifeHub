import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <UserContext.Provider value={{ height, setHeight, weight, setWeight }}>
      {children}
    </UserContext.Provider>
  );
};
