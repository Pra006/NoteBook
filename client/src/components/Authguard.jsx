import React from 'react'
import { useSession } from '../zustand/userSession'
import { Navigate, Outlet } from 'react-router-dom'

const Authguard = () => {
    const user = useSession((state) => state.user);
    if (!user){
        return <Navigate to="/login" replace />
    }
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default Authguard
