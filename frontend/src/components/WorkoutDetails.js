import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Date-fns to have a nice looking date
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if(!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if(response.ok){
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Repetitions: </strong>{workout.repetitions}</p>
      <p><strong>Load (kg): </strong> {workout.load}</p>
      <p>{ formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true }) }</p> {/* The suffix allow to add the AGO (2 days AGO) */}
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
   );
}
 
export default WorkoutDetails;