import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext(); // Since we ar eimporting 2 dispatch, we can rename one to use it

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  
  return { logout };
};