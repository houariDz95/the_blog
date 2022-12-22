import axios from 'axios';
import {useState, useEffect, createContext} from 'react';
import  { useRouter } from 'next/router';
import {BASE_URL} from '../utils';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  
  const router = useRouter();
  const [err, setErr] = useState(null);
  const [postToUpdate, setPostToUpdate] = useState([])
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("user") : null
  ));

  const login = async (inputs) => {

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, inputs);
      setCurrentUser(res.data); 
    } catch (error) {
      setErr(error?.response?.data)
    }
  }

  const logout = async () => {
    try{
      await axios.post(`${BASE_URL}/api/auth/logout`);
      setCurrentUser(null); 
      router.push("/");    
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return(
    <AuthContext.Provider value={{currentUser, login, logout, err, setPostToUpdate, postToUpdate, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
}
