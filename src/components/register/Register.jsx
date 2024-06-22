import React from 'react'
import './Register.scss'
import { useGetInputValue } from '../../hooks/useInputGetValue'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const initialState = {
    FirstName : "" , 
    LastName : "" , 
    UserName: "" , 
    phones : "" , 
    password : "" , 
}

const Register = () => {
   
    let navigate = useNavigate()
    const {formData , handleChange } = useGetInputValue(initialState)


    const handleRegister = e => {
        e.preventDefault() 
        formData.phones = [formData.phones]
        axios
            .post("/auth/user/sign-up" , formData)
            .then(res => {
              localStorage.setItem("x-auth-token" , res.data.data.token)
               navigate('/home')
              localStorage.setItem("user-data" , JSON.stringify(res.data.data.user))
              toast.success(res.data.message)
            })
    }
 
  return (
    <>
      <form onSubmit={handleRegister} action="">
          <h2>Register</h2>
          <div className="df">
          <span>
               <label htmlFor="">UserName</label>
               <input onChange={handleChange} value={formData.UserName} type="text" name='UserName'/>
           </span>
         
            <span>
               <label htmlFor="">Create Password</label>
               <input onChange={handleChange} value={formData.password} type="password" name='password' />
           </span>
          </div>
          <div className="df">
           <span>
                <label htmlFor="">FirstName</label>
                <input onChange={handleChange} value={formData.FirstName} type="text" name="FirstName" />
            </span>
           <span>
                <label htmlFor="">LastName</label>
                <input onChange={handleChange} value={formData.LastName} type="text" name='LastName' />
            </span>
          </div>
           <div className="df">
           <span>
               <label htmlFor="">Phone</label>
               <input onChange={handleChange} value={formData.phones} type="number" name='phones' />
           </span>
           </div>
           <button className='createbtn'>Create Account</button>
      </form>
    </>
  )
}

export default Register