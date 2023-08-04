"use client"
import {AiOutlineMenu} from 'react-icons/ai';
import Avaitar from '../Avaitar';
import { useCallback, useState } from 'react';
import MenuItems from './MenuItems';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserProps{
    currentUser?: SafeUser | null
}
const UserMenu: React.FC<UserProps> = ({currentUser}) => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])
    const onRent = useCallback(() => {
        if(!currentUser) return LoginModal.onOpen();

        rentModal.onOpen();
    }, [currentUser, LoginModal, rentModal])
  return (
    <div className='relative'>
        <div className="flex flex-row items-center gap3">
            <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Rent your home
            </div>
            <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition" >
                <AiOutlineMenu/>
                <div className="hidden md:block">
                    <Avaitar src={currentUser?.image}/>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md-w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (<>
                            <MenuItems
                                onClick={() => router.push('/trips')}
                                label='My trips'
                            />
                            <MenuItems
                                onClick={() => router.push('/favorites')}
                                label='My favorites'
                            />
                            <MenuItems
                                onClick={() => router.push('/reservations')}
                                label='My reservations'
                            />
                            <MenuItems
                                onClick={() => router.push('/properties')}
                                label='My properties'
                            />
                            <MenuItems
                                onClick={onRent}
                                label='Rent my home'
                            />
                            <hr />
                            <MenuItems
                                onClick={() => signOut()}
                                label='Logout'
                            />
                            
                        </>) : (
                        <>
                            <MenuItems
                                onClick={LoginModal.onOpen}
                                label='Login'
                            />
                            <MenuItems
                                onClick={RegisterModal.onOpen}
                                label='Sign up'
                            />
                        </>)
                        }
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default UserMenu