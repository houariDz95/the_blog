import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import {useRouter} from 'next/router';
import axios from "axios";
import {BASE_URL} from '../../utils';
import ArticleCard from '../../components/ArticleCard';


const styles ={
  lable: 'absolute top-[50%] left-[50%] text-green-500 border-[1px] border-green-500 w-1/2 py-1 bg-white cursor-pointer translate-y-[-50%] translate-x-[-50%] text-center hover:bg-green-500 hover:text-white rounded-full transition-all duration-500'
}


const Profile = ({user, posts}) => {
  const [file, setFile] = useState(null);
  const {setCurrentUser, currentUser} = useContext(AuthContext);
  const userPosts = posts.filter(post => post.uid === user[0].id);
  const router = useRouter();
  const upload = async () => {
    try {
      const formData = new FormData();
      
      formData.append("file", file);
      const res = await axios.post(`${BASE_URL}/api/upload`, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handelUpload = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try{
      await axios.put(`${BASE_URL}/api/upload/api/user/${user[0].id}`, {
        img:  file ? imgUrl : "",
      })
      window.location.reload();
      setCurrentUser({...currentUser, img: imgUrl})
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <div className="bg-gradient-to-r from-[#e61cd6] to-[#45bbcc] w-full h-[250px]" />
      <div className='flex flex-col items-center justify-center mt-[-85px]'>
        <div className='w-[150px] h-[150px] relative'>
          <img 
            src={user[0].img ? `../uploads/${user[0].img}` :
             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
            alt="user" 
            className='w-full h-full rounded-full'
          />
          {(!user[0].img & currentUser?.username === user[0].username) ? 
          <>
          {file  ? (<label onClick={handelUpload} className={styles.lable}>upload</label>) : (
          <label htmlFor='file' className={styles.lable}>Add Photo</label>
          )}
          </>: ""}
          <input type="file" id="file" className="hidden"  onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className="text-center mt-2">
          <h1 className="text-md font-semibold text-[#1a1b1f]">{user[0].username}</h1>
        </div>
      </div>
      <div className="px-10 md:px-20">
        <h1 className="text-2xl font-bold text-gray-500 text-center md:text-left">{user[0].username}'s Articles</h1>
          <ArticleCard posts={userPosts}/>
      </div>
    </div>
  )
}

export default Profile

export const getServerSideProps = async ({ params: { id }}) => {
  const resUser = await axios.get(`${BASE_URL}/api/user/${id}`);
  const resPosts = await axios.get(`${BASE_URL}/api/posts/posts`)
  const user = resUser.data
  const posts = resPosts.data
  return {
    props: {  user, posts }
  }
}
