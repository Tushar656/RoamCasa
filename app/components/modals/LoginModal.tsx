"use client"

import {signIn} from 'next-auth/react'
import axios from "axios"
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from "react"
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Inputs from "../inputs/Inputs"
import {toast} from 'react-hot-toast'
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        RegisterModal.onOpen();
    }, [loginModal, RegisterModal])
    
    const bodyContant = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your Account!"
            />
            <Inputs id="email" label="Email" disabled={isLoading} errors={errors} required register={register}/>
            <Inputs id="password" type="password" label="Password" disabled={isLoading} errors={errors} required register={register}/>
        </div>
    )

    const footerContant = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue With Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue With Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex items-center gap-2">
                    <div>Don't have an account?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Signup
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionlabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContant}
        footer={footerContant}
    />
  )
}

export default LoginModal