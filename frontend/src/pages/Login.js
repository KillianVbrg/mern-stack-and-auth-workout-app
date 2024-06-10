import { useState } from "react"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async event => {
    event.preventDefault();

    login(email, password);
  }

  return ( 
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email</label>
      <input 
        type="email"
        name="email"
        onChange={event => setEmail(event.target.value)}
        value={email}
      />
      <label>Password</label>
      <input 
        type="password"
        name="password"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />

      <button type="submit" disabled={isLoading} >Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
 
export default Login;