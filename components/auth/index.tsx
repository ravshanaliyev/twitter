"use client";
import Image from 'next/image'
import React, { useCallback } from 'react'
import Button from '../ui/button'
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import useRegisterModal from '@/hooks/useRegisterModal'
import RegisteredModal from '../modals/register-modal'
import useLoginModal from '@/hooks/useLoginModal';
import LoginModal from '../modals/login-modal';
import {signIn, useSession} from 'next-auth/react'

const Auth = () => {
  const registerModal  = useRegisterModal()
  const loginModal = useLoginModal()
  const {data} = useSession()
  console.log(data);
  
  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen()
  }, [registerModal])
  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])
  return (
    <>
      <RegisteredModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image className='justify-self-center hidden md:block' src="/images/x.svg" width={400} height={400} alt="Auth" />
        <div className="flex flex-col justify-center md:justify-between space-y-10 h-full  md:h-[70vh]">
          <div className='block md:hidden'>
            <Image src="/images/x.svg" width={50} height={50} alt="Auth" />
          </div>
          <h1 className='text-6xl font-bold'>Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className='font-bold text-3xl mb-4'>Join Today.</h2>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => signIn("google")} label={
                <div className='flex gap-2 items-center justify-center'>
                  <FcGoogle />
                  Sign up with Google
                </div>
              } fullWidth secondary />
              <Button onClick={() => signIn("github")} label={
                <div className='flex gap-2 items-center justify-center' >
                  <AiFillGithub />
                  Sign up with Github
                </div>
               }  fullWidth secondary />
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2">
                </div>
                  <p className='mx-4'>or</p>
                <div className="h-px bg-gray-700 w-1/2"></div>
              </div>
              <Button label={"Create Account"} fullWidth onClick={onOpenRegisterModal}/>
              <div className='text-[12px] text-gray-400'>
                By signing up, you agree to the{" "}
                <span className='text-sky-500 cursor-pointer'>Terms of Service</span> and 
                <span className='text-sky-500 cursor-pointer'> Privacy Policy</span>
                , including
                <span className='text-sky-500 cursor-pointer'> Cookie Use</span>.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h3 className='font-medium text-xl mb-4'>Already have an account?</h3>
            <Button label={"Sign in"} fullWidth outlined onClick={onOpenLoginModal}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth