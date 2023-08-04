"use client"

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
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(() => {
            toast.success("Successfuly Registered")
            RegisterModal.onClose();
            LoginModal.onOpen();
        })
        .catch((error) => {
            toast.error("Something Went Wrong");
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const toggle = useCallback(() => {
        LoginModal.onOpen();
        RegisterModal.onClose();
    }, [LoginModal, RegisterModal])

    const bodyContant = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to airbnb"
                subtitle="Create an Account!"
            />
            <Inputs id="name" label="Name" disabled={isLoading} errors={errors} required register={register}/>
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
                    <div>Already have an account?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title='Register'
        actionlabel="Continue"
        onClose={RegisterModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContant}
        footer={footerContant}
    />
  )
}

export default RegisterModal
