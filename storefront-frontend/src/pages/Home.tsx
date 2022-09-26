import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const Home = () => {
  const [isSigned, setIsSigned] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsSigned(true);
    }
  }, [isSigned])
  
  const signOut = () => {
    sessionStorage.removeItem("token");
    setIsSigned(false)
  }

  return (
    <header>
      <div className="slogan">Udagram Frontend</div>
      <header>
      <ul className="check">
        {
          isSigned ?
          <Link to="/" onClick={signOut} >Sign out</Link> :
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        }
      </ul>
      </header>
    </header>
  )
}

export default Home