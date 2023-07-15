import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'

export default () => {
  const navigate = useRouter();
  const { width, height } = useWindowSize()
  const playAgain = () => {
    navigate.push('/');
  }
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      <Confetti
      width={width}
      height={height} />
      
      <button
        className="flex flex-col items-center text-white font-extrabold text-4xl cursor-pointer rounded-full px-14 py-14 space-x-2 bg-red-600 mt-14 mb--14"
        onClick={() => playAgain()}
      >
        PLAY AGAIN
      </button>
    
    
    
    
    </div>


  )
}