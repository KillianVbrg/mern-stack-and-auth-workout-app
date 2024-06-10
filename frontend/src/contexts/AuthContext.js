import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }

    case "LOGOUT":
      return { user: null }
  
    default:
      return state;
  };
};

export const AuthContextProvider = ({ children }) => {
  const local = localStorage.getItem("user");

  const [state, dispatch] = useReducer(authReducer, {
    user: local ? JSON.parse(local) : null // Use this or a useEffect that dispatches 'LOGIN' and the user as payload if the user is in localStorage
  });

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;