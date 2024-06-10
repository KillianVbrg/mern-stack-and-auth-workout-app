import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) { // If the useWorkoutContext is called outside a component wrapped by the WorkoutsContextProvider
    throw Error("useWorkoutContext must be used inside a WorkoutsContextProvider");
  }

  return context;
}