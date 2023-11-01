import { ReactNode } from 'react'
import Footer from 'src/components/Footer/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
  children?: ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      <div className='min-h-[600px] w-full bg-orange flex items-center justify-end py-[80px]'>{children}</div>
      <Footer />
    </div>
  )
}
