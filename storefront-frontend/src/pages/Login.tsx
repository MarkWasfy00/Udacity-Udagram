import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_HOST}/api/auth/login`,{
      email,
      password
    })
    .then(user => {
      sessionStorage.setItem("token", user.data.userToken);
      history("/");
    })
    .catch(error => {
      setError(error.response.data.msg)
    });
  }

  return (
    <>
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <div className="error">{true && error}</div>
      </form>
      
    </>
  )
}

export default Login