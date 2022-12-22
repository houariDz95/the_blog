import { useRouter } from 'next/router';
import React from 'react';
import moment from 'moment';
const Recommended = ({posts}) => {
  const router = useRouter();
  return (
    <div className='fixed p-2 shadow-lg border-[1px] h-[550px] w-[450px] border-gray-50'>
      <h1>You may also like</h1>
      <div className='overflow-y-scroll scrollbar-hide '>
      {posts.map(post => (
        <div
        onClick={() => router.push(`/post/${post.id}`)} 
        key={post.id} 
        className="flex justify-start items-center gap-5 cursor-pointer shadow-lg p-2 rounded-lg mb-2 hover:scale-105">
          <img src={post.img} alt="" className='object-contain w-[100px] h-[100px]'/>
          <div>
            <h1 className="text-[15px] font-[300] text-gray-900">{post.title}</h1>
            <p className="text-sm font-[100] text-gray-500">posted: <span>{post.date}</span></p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Recommended