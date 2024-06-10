import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", { // Whether we have a token, or a error
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    } else {
      // Save the user to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      setError(null);
    };
  };

  return { signup, isLoading, error }
};

