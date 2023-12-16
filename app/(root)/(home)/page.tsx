import Auth from '@/components/auth'
import React from 'react'

export default function page() {
    const user = false

    if(!user) return (
      <div className='container h-screen mx-auto max-w-7xl'>
        <Auth />
      </div>
    )
  return (
    <div className='text-3xl'>page</div>
  )
}
