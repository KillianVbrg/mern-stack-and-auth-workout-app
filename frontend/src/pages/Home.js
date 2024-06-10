import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Component
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import SkeletonWourkoutDetails from "../skeletons/SkeletonWorkoutDetails";
import { useLogout } from "../hooks/useLogout";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    setTimeout(() => { // So we can see the skeleton loader
      const fetchWorkouts = async () => {
        const response = await fetch("/api/workouts", {
          headers: {
            "Authorization": `Bearer ${user.token}` // We have to add the header to the request to prove that the user is logged in, else, the protected API routes will response with an error
          }
        }); // We don't put "http://localhost:3001" since we added the proxy param in package.json (INDISPENSABLE POUR LES REQUETES FAITES SUR UN AUTRE SERVEUR QUE LE SERVEUR REACT (TOUT LE TPS))
        const json = await response.json(); // Array to json Object

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        } else {
          logout();
        }
      }

      if (user) { // If user if logged in, we fetch the workouts
        fetchWorkouts();
      }
    }, 500);
  }, [dispatch, user]) // It fires onces

  return (
    <div className="home">
      <div className="workouts">
        {!workouts && [1, 2, 3, 4, 5].map(n => <SkeletonWourkoutDetails key={n} />)}
        {workouts && workouts.map(workout => ( // Only if we have a value for workout, we map through them, if workouts is null, we don't map
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;