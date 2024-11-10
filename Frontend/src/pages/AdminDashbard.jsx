import React from 'react'
import { useAuth } from '../context/authContext'

const AdminDashbard = () => {
  const {user} = useAuth()
  return (
    <div>AdminDashbard {user && user.name}</div>
  )
}

export default AdminDashbard