import {useState, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import Router, {useRouter} from 'next/router';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import moment from 'moment';
import {FiMoreHorizontal} from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import {MdSystemUpdateAlt} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai';
import {BASE_URL} from '../../utils';
import { parse } from 'node-html-parser';
import Recommended from '../../components/Recommended';

const styles = {
  wrapper: 'w-full',
  container: 'max-w-[90%] w-full m-auto flex flex-col justify-start',
  img: 'object-cover h-[300px]',
  grid: 'flex mb-5 gap-5',
  content: 'mt-10 flex-[2]',
  userProfile: 'w-full flex items-center justify-between',
  userProfileLeft: 'flex items-center gap-[5px]', 
  userProfileLeftInfo: 'flex flex-col gap-[5px]',
  userProfileRight: 'relative',
  userProfileRightButton: 'py-2 text-sm hover:text-gray-900 gap-[5px] text-gray-500 flex items-center',
  userProfileRightButtonContainer: 'flex flex-col gap-[2px] p-2 w-[250px] bg-white border-[1px] border-gray-400 absolute top-7 right-5',
  postContentWrapper: 'flex-1 mt-4',
  postContentContainer: 'flex w-full flex-col items-center gap-10',
}

const Post = ({post, posts}) => {
  const {setPostToUpdate, currentUser} = useContext(AuthContext);
  const [showModel, setShowModel] = useState(false);

 const getText = (html) =>{
   const doc =  parse(html, "text/html")
   return doc.textContent
 }
  const router = useRouter()

  const handelUpdate = () => {
    Router.push({
      pathname: `/write`,
      query: {edit: post[0].id}
    })
    setPostToUpdate(post[0])
  }
  const handelDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${post[0].id}`)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div>
      <Navbar single/>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.content}>
              <div className={styles.userProfile}>
                <div className={styles.userProfileLeft}>
                  <img 
                    onClick={() => router.push(`/profile/${post[0].uid}`)}
                    src={post[0].userImg ? `../uploads/${post[0].userImg}` : 
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} 
                    alt=''
                    className='w-10 h-10 rounded-full'
                  />
                  <div className={styles.userProfileLeftInfo}>
                    <h1 className="text-base font-[500] text-gray-800">{post[0].username}</h1>
                    <p className="text-sm font-[300] text-gray-500">{moment(post[0].date).fromNow()}</p>
                  </div>
                </div>
                <div className={styles.userProfileRight} >
                  {!showModel ? <FiMoreHorizontal size={30} color="gray" 
                  className={`${currentUser?.username === post[0].username ? 'pointer-events-auto' : 'pointer-events-none'}`} 
                  onClick={() => setShowModel(true)}/> :
                    <AiOutlineClose size={30} color="gray" className='cursor-pointer' onClick={() => setShowModel(false)} />
                  }
                  {showModel &&<div className={styles.userProfileRightButtonContainer}>
                    <span className={styles.userProfileRightButton} onClick={handelUpdate}><MdSystemUpdateAlt size={20} /> Update</span>
                    <span className={styles.userProfileRightButton} onClick={handelDelete}><BsFillTrashFill size={20} /> Delete</span>
                  </div>}
                </div>
              </div>
              <div className={styles.postContentWrapper}>
                <div className={styles.postContentContainer}>
                  <h1 className="md:text-3xl text-xl text-left font-semibold text-gray-800">{post[0].title}</h1>
                  <img src={post[0].img} alt="" height={200} className="object-contain"/>
                  <p className="font-[300] text-gray-600 text-[16px] leading-8">{getText(post[0].desc)}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 hidden lg:flex mt-10">
              <Recommended posts={posts} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Post;

export const getServerSideProps = async ({ params: { id }}) => {
  const response = await axios.get(`${BASE_URL}/api/posts/${id}`);  
  const post = response.data

  const res = await axios.get(`${BASE_URL}/api/cat/${post[0].cat}`);
  const posts = res.data
  return {
    props: {  post, posts }
  }
}
