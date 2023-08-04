"use client"

import Image from "next/image"

interface AvataProps {
  src?: string | null | undefined
};

const Avaitar: React.FC<AvataProps> = ({src}) => {
  return (
    <Image
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={src || "http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png"}
    />
  )
}

export default Avaitar