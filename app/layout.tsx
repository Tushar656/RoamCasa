import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter, Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrectUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const inter = Inter({ subsets: ['latin'] })
const nunito = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RoamCasa',
  description: 'RoamCasa - Rent your Property',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrectUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider/>
        <RentModal/>
        <SearchModal/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser = {currentUser}/>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
