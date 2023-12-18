import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Modal from '../ui/modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Button from '../ui/button'
import useRegisterModal from '@/hooks/useRegisterModal'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import axios from 'axios'

const LoginModal = () => {
    const [error, setError] = useState('')
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const onToggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { data } = await axios.post('/api/auth/login', values)
            if(data.success){
                loginModal.onClose()
            }
        } catch (error: any) {
            if (error.response.data.error) {
                setError(error.response.data.error)
            } else {
                setError("Something went wrong. Please try again later")
            }
        }
    }
    const { isSubmitting } = form.formState
    const body = <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-10">
            {
                error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )
            }
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
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button label="Login" type="submit" secondary fullWidth large disabled={isSubmitting} />
        </form>
    </Form>

    const footer = (
        <div className="text-neutral-400 text-center mb-2">
            <p>
                First time using Twitter?
                <span
                    onClick={onToggle}
                    className="text-sky-500 cursor-pointer hover:underline"
                >
                    {" "}
                    Sign up
                </span>
            </p>
        </div>
    )
  return (
    <Modal 
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    body={body}
    footer={footer}
    />
  )
}

export default LoginModal