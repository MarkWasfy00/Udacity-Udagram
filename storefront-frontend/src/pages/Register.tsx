import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_HOST}/api/auth/register`,{
      email,
      firstname,
      lastname,
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
      <form onSubmit={register}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" name="firstname" placeholder="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        <input type="text" name="lastname" placeholder="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <div className="error">{true && error}</div>
      </form>
    </>
  )
}

export default Register