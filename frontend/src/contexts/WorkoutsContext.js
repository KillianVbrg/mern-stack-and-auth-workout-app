import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => { // Previous state value and the action are taken as arguments
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [
          action.payload,
          ...state.workouts,
        ],
      };
    case "DELETE_WORKOUT":
      return {
        // Where they are not equal, we want to keep them
        workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
      };
  
    default:
      return state; // Unchanged state
  };
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });


  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  );
};
 
export default WorkoutsContextProvider;