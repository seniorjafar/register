import axios from '../../api'
import React, { useEffect, useState } from 'react'
import './Users.scss'
import xzoka from '../../assets/xzoka.jpg'
import { useNavigate } from 'react-router-dom'
const Users = () => {
    const navigate = useNavigate()
    const [users , setUsers] = useState(null)
    const userData = JSON.parse(localStorage.getItem("user-data"))

    if(userData?.role == "admin"){
        useEffect(() => {
            axios
                .get('/users/search' , {params: {limit : 100}})
                .then(res => setUsers(res.data.data.users))
        } , [])
    }  

    const handleLogOut = () => {
        if(window.confirm('Are you Sure')){
            navigate('/login')
            localStorage.clear()
        }
        else{
            <></>
        }
    }

  return (
      <>
    <div className="container">
        <div className='admin' >
        <h2>{userData?.role}:</h2>
        <h1>{userData?.UserName}</h1>
        <img src={xzoka} alt="" />
        </div >
       {
           userData?.role == "admin" ? 
           <div className='adminpage'>
               <span>
                    <h2>Users</h2>
               </span>
            <div className="user__cards">
                {
                    users?.map(user => (
                        <div className='user__card' key={user.id}>
                        <img src={xzoka} alt="" />
                        <h2>{user.FirstName}</h2>
                        <h2>{user.LastName}</h2>
                    </div>
                    )
                )
            }
            </div> 
          </div>
          : 
        <h2>Welcome</h2> 
       }
      
    </div>
    <button className='logbtn' onClick={handleLogOut} >Log Out</button>
    </>
  )
}

export default Users