import React, { useState} from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'
import {BASE_URL} from '../../utils';

const styles = {
  wrapper: 'h-screen w-screen bg-[#1a1b1f] flex items-center justify-center',
  form: 'w-[300px] bg-white p-[50px] flex flex-col justify-center gap-8',
  title: 'text-[#1a1b1f] font-semibold text-lg text-center',
  button: 'border-[1px] border-[#1a1b1f] text-[#1a1b1f]',
  input: 'p-2 focus:outline-none border-b-[1px] border-gray-500',
}



const register = () => {
  const [inputs, setInputs] = useState({username: '', email: '', password: ''});
  const router = useRouter()
  const [err, setErr] = useState(null);
  const handelChange = (e) => {
   setInputs((prev) => ({...prev, [e.target.name]: e.target.value})) 
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
      try {
        await axios.post(`${BASE_URL}/api/auth/register`, inputs);
        router.push('/auth/login')

      } catch (error) {
        setErr(error.response.data)
      } 
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.title}>Register</h1>
        <input className={styles.input} type="text" placeholder="username" name="username" onChange={handelChange} />
        <input className={styles.input} type="text" placeholder="email" name="email" onChange={handelChange} />
        <input className={styles.input} type="password" placeholder="password" name="password" onChange={handelChange} />
        {err && <span className='text-red-800 text-sm'>{err}</span>}
        <button className={styles.button} type="button" onClick={handelSubmit}>Register</button>
        <span className="text-xs">
          Do you have an account? <Link href="/auth/login" className="text-[#1a1b1f]">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default register