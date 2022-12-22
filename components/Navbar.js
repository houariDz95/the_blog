import { useState, useContext, useEffect } from 'react';
import {AuthContext} from "../context/AuthContext";
import { useRouter } from 'next/router';
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const styles = {
  wrapper: "w-full bg-[#1a1b1f] px-5 xl:px-0 ",
  container: "max-w-[1024px] w-full m-auto flex justify-between items-center",
  right: "flex items-center gap-10",
  logo: " text-white font-bold cursor-pointer",
  listsContainer: "lg:flex items-center gap-10 text-md text-gray-500 uppercase hidden",
  list: "hover:text-white transition-all duration-200",
  buttonContainer: "hidden lg:block",
  button: "px-6 py-1 border-[1px] border-white text-white cursor-pointer text-sm rounded-full hover:bg-white hover:text-black mt-3 md:mt-0 " ,
  wrapperSm: "absolute w-full h-full bg-white/[.5] absolute top-0 left-0 block lg:hidden",
  listContainerSm: "fixed bg-[#1a1b1f] h-full w-[80%] flex flex-col justify-start p-4 gap-[65px] text-lg font-semibold text-gray-500 items-center",
  userInfoContainer: "flex flex-col items-center gap-[5px]",
  userInfoImg: "w-10 h-10 rounded-full cursor-pointer",
  userInfoName: "text-xs text-gray-500 font-semibold",
  writeButton: "px-6 py-1 border-[1px] border-green-500 text-green-500 cursor-pointer text-sm rounded-full hover:bg-green-500 hover:text-white",
  btnMenu: 'flex items-center p-4 text-gray-500 gap-2 hover:text-gray-900 text-[16px] font-base'
}


const Navbar = ({single}) => {

  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false);
  const {currentUser, logout} = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false)
  }, [])
  return(
    <div className={styles.wrapper}>
      <div className={`${single ? 'p-4' : 'py-10'} ${styles.container}`} >
      <div className={styles.right}>
        <h1 className={styles.logo} onClick={() => router.push('/')}>/TheBlog</h1>
        <ul className={styles.listsContainer}>
          <li className={styles.list}>
            <Link href="/categories/programming">Programming</Link>
          </li>
          <li className={styles.list}>
            <Link href="/categories/food">Food</Link>
          </li>
          <li className={styles.list}>
            <Link href="/categories/health">Health</Link>
          </li>
          <li className={styles.list}>
            <Link href="/categories/technology">Technology</Link>
          </li>
          <li className={styles.list}>
            <Link href="/categories/science">Science</Link>
          </li>
        </ul>
      </div> 
      <div className=" items-center gap-5 hidden lg:flex">
      {auth ? 
          <button className={styles.writeButton} onClick={() => router.push('/write')}>Write</button> : 
          <button className={styles.button} onClick={() => router.push('/auth/login')}>Login</button>
        }
        {auth && 
        <div className="flex items-center gap-5">
          <button className={styles.button} onClick={logout}>Logout</button>
          <div className={styles.userInfoContainer}>
            <img src={currentUser?.img ? `../uploads/${currentUser.img}` : 
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
              alt="" 
              className={styles.userInfoImg} 
              onClick={() => router.push(`/profile/${currentUser.id}`)}
            />
            <p className={styles.userInfoName}>{currentUser?.username}</p>
          </div>        
        </div>}
      </div>
      <div className="flex items-center lg:hidden gap-10">
        <div className="flex " onClick={() => setShowMenu(true)}>
            <AiOutlineMenu color="white" size={30} />
        </div>
      </div>
      {showMenu && (
        <div >
          <div className={styles.wrapperSm}>
            <ul className={styles.listContainerSm}>
              <AiOutlineClose size={30} className={styles.list} onClick={() => setShowMenu(false)} />
              <li className={styles.list}>
              <Link href="/categories/programming">Programming</Link>
            </li>
            <li className={styles.list}>
              <Link href="/categories/food">Food</Link>
            </li>
            <li className={styles.list}>
              <Link href="/categories/health">Health</Link>
            </li>
            <li className={styles.list}>
              <Link href="/categories/technology">Technology</Link>
            </li>
            <li className={styles.list}>
              <Link href="/categories/science">Science</Link>
            </li>
            <div>
            {auth ? 
            <div className="flex flex-col absolute bottom-20 left-10 w-[80%]">
              <button className={styles.writeButton} onClick={() => router.push('/write')}>Write</button> 
              <button className={styles.button} onClick={logout}>Logout</button>       
            </div> :
            <button className={styles.button} onClick={() => router.push('/auth/login')}>Login</button>
            }
            </div>
          </ul>
        </div>
       </div>
      )}
      </div>
    </div>
  )
}

export default Navbar