import React, { useState, useContext } from 'react'
import Link from 'next/link';
import axios from 'axios';
import  { useRouter } from 'next/router';
import {AuthContext} from "../../context/AuthContext";

const styles = {
  wrapper: 'h-screen w-screen bg-[#1a1b1f] flex items-center justify-center',
  form: 'w-[300px] bg-white p-[50px] flex flex-col justify-center gap-8',
  title: 'text-[#1a1b1f] font-semibold text-lg text-center',
  button: 'border-[1px] border-[#1a1b1f] text-[#1a1b1f]',
  input: 'p-2 focus:outline-none border-b-[1px] border-gray-500',
  
}


const Login = () => {
  const [inputs, setInputs] = useState({username: '', password: ''});
  const router = useRouter();
  const  {login, err} = useContext(AuthContext);
  const handelChange = (e) => {
   setInputs((prev) => ({...prev, [e.target.name]: e.target.value})) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(inputs);
    router.push('/')
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <input className={styles.input} type="text" placeholder="username" name="username" onChange={handelChange} />
        <input className={styles.input} type="password" placeholder="password" name="password" onChange={handelChange} />
        {err && <span className="text-red-800 text-sm">{err}</span>}
        <button className={styles.button} type="button" onClick={handleSubmit}>Login</button>
        <span className="text-xs">
          Don't you have an account?<Link href="/auth/register" className="text-[#1a1b1f]">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login