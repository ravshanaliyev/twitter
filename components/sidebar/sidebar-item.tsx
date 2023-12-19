import { LucideIcon } from 'lucide-react'
import React from 'react'
interface Props {
        label: string
        icon: LucideIcon
}
const SidebarItem = ({ icon: Icon, label}: Props) => {
  return (
    <div className='flex flex-row items-center'>
        <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
            <Icon size={28} color='white'/>
        </div>
        <div className="relative rounded-full gap-4 lg:flex items-center  p-4 hover:bg-slate-300 hover:bg-opacity-10 hidden">
            <Icon size={28} color='white'/>
            <p className='hidden lg:block text-xl text-white'>{label}</p>
        </div>
    </div>
  )
}

export default SidebarItem