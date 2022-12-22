import React from 'react'

const ArticleCard = ({posts}) => {
  return (
    <div className="grid gap-10 lg:grid-cols-2 grid-cols-1 mt-10 mb-20">
    {posts.map(post=>(
      <div key={post.id}>
        <div className="flex-1 shadow-xl shadow-gray-500 rounded-lg max-h-[500px] h-full cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
          <img src={post.img} alt="" className=" object-cover rounded-t-lg w-full h-[80%]" />
          <h1 className="text-md md:text-xl p-2 md:py-5 font-semibold text-gray-900p">{post.title}</h1>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ArticleCard