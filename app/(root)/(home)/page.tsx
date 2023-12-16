import Auth from '@/components/auth'
import React from 'react'

export default function page() {
    const user = false

    if(!user) return <Auth />
  return (
    <div className='text-3xl'>page</div>
  )
}
