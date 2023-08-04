"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
        onClick={() => router.push('/')}
            src={"/Images/logo4.png"}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            width="100"
            height="80"
        />
    )
}

export default Logo;