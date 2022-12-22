import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from 'axios';
import moment from "moment";
import { useRouter } from "next/router";
import {BASE_URL} from '../utils';


const styles = {
  navWrite: 'w-full max-w-[90%] m-auto flex items-center justify-between p-5',
  navWriteLeft: 'flex items-center gap-5',
  logo: " text-[#1a1b1f] font-bold",
  draft: 'text-sm text-gray-500',
  navWriteRight: 'flex items-center gap-5',
  publishButton: 'px-4 py-1 bg-green-500 text-white rounded-full text-small cursor-pointer',
  avatar: 'w-10 h-10 rounded-full',
  form: 'w-full max-w-[90%] m-auto flex flex-col md:flex-row justify-between',
  inputs: 'flex flex-col flex-1 md:flex-[2]',
  input: 'p-4 focus:outline-none  text-lg',
  editor: 'p-4 h-[300px] border-[1px] border-green-300 resize-none focus:outline-none',
  radioCategpries: 'flex-1 p-4 flex flex-col  gap-5 my-5 md:mt-0',
  cat: 'flex items-center justify-start  gap-[5px] hover:bg-gray-200 py-2',
  label: 'text-normal font-[500] text-gray-500',
}

const  Write = () => {
  const route = useRouter();  
  const {currentUser, postToUpdate} = useContext(AuthContext);
  const [value, setValue] = useState(postToUpdate ? postToUpdate.desc : "");
  const [title, setTitle] = useState( postToUpdate ? postToUpdate.title : "");
  const [img, setImg] = useState(postToUpdate ? postToUpdate.img : "");
  const [cat, setCat] = useState(postToUpdate ? postToUpdate.cat : "");
  const id = route.query.edit; 

  const handelClick = async () => {
    try {
      id ?
      axios.put(`${BASE_URL}/api/posts/${id}`, {
        title,
        desc: value,
        img,
        cat,
      }):
      await axios.post(`${BASE_URL}/api/posts/posts`, {
        title,
        desc: value,
        img,
        cat,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
      route.push('/');
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div>
      <div className={styles.navWrite}>
        <div className={styles.navWriteLeft}>
          <h1 className={styles.logo}>/TheBlog</h1>
          <p className={styles.draft}>Draft in <span className="text-black"></span></p>
        </div>
        <div className={styles.navWriteRight}>
          <button className={styles.publishButton} onClick={handelClick}>Publish</button>
          <img 
            src={currentUser?.img ? `../uploads/${currentUser?.img}` : 
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
            alt=""
            className={styles.avatar}
          />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <input type="text" className={styles.input} placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" className={styles.input} placeholder="image URL" vlaue={img} onChange={(e) => setImg(e.target.value)} />
          <textarea
            className={styles.editor}
            theme="snow"
            value={value}
            onChange={(e) =>setValue(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.radioCategpries}>
        <h1 className="text-2xl md:text-xl text-gray-800 underline mt-5 md:mt-0">Category</h1>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "programming"}
              name="cat"
              value="programming"
              id="programming"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className={styles.label} htmlFor="programming">Programming</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className={styles.label} htmlFor="science">Science</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className={styles.label} htmlFor="technology">Technology</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className={styles.label} htmlFor="health">Health</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label className={styles.label} htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write