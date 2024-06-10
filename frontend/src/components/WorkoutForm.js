import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();

    if(!user){ // If the user is not logged in, we stop the function with return and set an error
      setError("You must be logged in");
      return;
    }

    const workout = {title, repetitions, load};

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if(!response.ok){
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setRepetitions("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("New workout added");
    }
  }

  return ( 
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercice title</label>
      <input type="text"
        onChange={event => setTitle(event.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}  
      />
      
      <label>Repetitions</label>
      <input type="number"
        onChange={event => setRepetitions(event.target.value)}
        value={repetitions}
        className={emptyFields.includes("repetitions") ? "error" : ""}  
      />
      
      <label>Load (in kgs)</label>
      <input type="number"
        onChange={event => setLoad(event.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}  
      />

      <button type="submit">Add workout</button>
      {error && <div className="error">{ error }</div>}
    </form>
   );
}
 
export default WorkoutForm;