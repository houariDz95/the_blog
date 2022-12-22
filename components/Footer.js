import React from 'react'

const Footer = () => {
  return (
    <footer className="w-[1250px] m-auto h-20 bg-[#1a1b1f] flex items-center justify-between px-4 text-white mb-2">
      <h1 className='font-bold'>/TheBlog</h1>
      <span className="leading-3">
        Made with <span className='text-red-500 text-xl'> ♥️ </span> and <b>React.js</b>.
      </span>
    </footer>
  )
}

export default Footer