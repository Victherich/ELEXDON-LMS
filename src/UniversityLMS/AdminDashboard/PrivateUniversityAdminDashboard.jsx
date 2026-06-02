import React, { useContext, useState } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { Context } from '../../components/Context'
import { useSelector } from 'react-redux'

const PrivateUniversityAdminDashboard = () => {
   
   const adminToken = useSelector(state=>state.adminToken)
    
  return (
   adminToken?<Outlet/>:<Navigate to="/universityadminlogin"/>
  )
}

export default PrivateUniversityAdminDashboard
