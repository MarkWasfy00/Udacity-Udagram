import  { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";

type Jwt = {
    exp: number;
}

const VerfiyAuth = () => {
    let location = useLocation();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    try {
      if (token) {
        const decodedJwt = jwt_decode(token);
        if ((decodedJwt as Jwt).exp * 1000 < Date.now()) {
          sessionStorage.removeItem("token");
        }
      }
    } catch (err) {
      sessionStorage.removeItem("token");
    }
  }, [location]);

    return <></>;
}

export default VerfiyAuth