import { createContext, useState } from 'react';
import { auth, firestore, storage } from '../firebase/config';

// Create contexts
export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default ContextProvider;
