"use client";
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { useState } from 'react'
import Modal from '../ui/modal'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { registerStep1Schema } from '@/lib/validation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Button from '../ui/button';
import { Input } from '../ui/input';
const RegisteredModal = () => {
  const [step, setStep] = useState(1)
  const registerModal = useRegisterModal()
  const body = step === 1 ? <RegisterStep1 /> : <RegisterStep2 />
  const footer = <div className='text-neutral-400 text-center mt-1'>
    <p>Already have an account?{" "}
    <span className='text-sky-500 cursor-pointer'>Sign in</span></p>
  </div>
  return (
    <Modal   body={body} footer={footer} isOpen={registerModal.isOpen} onClose={registerModal.onClose} step={step} totalSteps={2}/>
  )
}
function RegisterStep1() {
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  })
  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    console.log(values); 
  }
  const {isSubmitting} = form.formState
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label="Next" type="submit" secondary fullWidth large disabled={isSubmitting} />
      </form>
    </Form>
  )
} 
function RegisterStep2() {
  return (
    <div>Register Step 2</div>
  )
}


export default RegisteredModal
