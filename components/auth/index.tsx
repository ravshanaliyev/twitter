import Image from 'next/image'
import React from 'react'

const Auth = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-10 items-center h-screen">
        <Image className='justify-self-end' src="/images/x.svg" width={400} height={400} alt="Auth" />
        <div className="flex flex-col justify-between h-[70vh]">
          <h1 className='text-6xl font-bold'>Happening now</h1>
          <div className="w-[60%]">
            <h2 className='font-bold text-3xl mb-4'>Join Today.</h2>
            <div className="flex flex-col space-y-2">
              <button>Sinf</button>
              <button>Sinf</button>
              <p>or</p>
              <button>Create</button>
            </div>
          </div>
          <div className='w-[60%]'>
            <h3 className='font-medium text-xl mb-4'>Already have an account?</h3>
            <button>Sing</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth