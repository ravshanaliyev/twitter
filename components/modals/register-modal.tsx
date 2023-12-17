"use client";
import useRegisterModal from '@/hooks/useRegisterModal'
import React from 'react'
import Modal from '../ui/modal'

const RegisteredModal = () => {
  const registerModal = useRegisterModal()
  const body = <div>body</div>
  const footer = <div>footer</div>
  return (
    <Modal   body={body} footer={footer} isOpen={registerModal.isOpen} onClose={registerModal.onClose}/>
  )
}

export default RegisteredModal