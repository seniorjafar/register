import React, { useEffect, useState } from 'react'
import './Login.scss'
import Modul from '../../components/modul/Modul';
import Register from '../../components/register/Register';
import { useGetInputValue } from '../../hooks/useInputGetValue';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const initialState = {
  UserName : "" ,
  password : ""
}
const Login = () => {

    let navigate = useNavigate()
    useEffect(()=>{
        
        let token = localStorage.getItem("x-auth-token")
        if(token){
            navigate('/home')
        }
    })

  const [loading , setLoading] = useState(false)

  let [payment , setPayment] = useState(false)

  const {formData , handleChange } = useGetInputValue(initialState)

  const handleLogin = e => {
    setLoading(true)
    e.preventDefault()

    axios
        .post("/auth/sign-in" , formData)
        .then(res => {
            localStorage.setItem("x-auth-token" , res.data.data.token)
            navigate('/home')
            localStorage.setItem("user-data" , JSON.stringify(res.data.data.user))
            toast.success(res.data.message)
        }
        )
        .catch(err => alert('login yoki parol notogri'))
  }



  return (
    <>
    <div className="login">
        <div className="container">
            <div className="form">
                <form onSubmit={handleLogin} action="">
                    <h2>Login</h2>
                    <span>
                        <label htmlFor="">UserName</label>
                        <input onChange={handleChange} name='UserName' value={formData.UserName} type="text" />
                    </span>
                    <span>
                        <label htmlFor="">Password</label>
                        <input onChange={handleChange} name='password' value={formData.password} type="password" />
                    </span>
                    <button className='loginbtn'>Login</button>
                </form>
                    <button disabled={loading}  onClick={() => setPayment(p => !p)} className='register'>Register</button>
                {
                    payment && 
                    <Modul show={payment} onClose={() => setPayment(false)}>
                        <Register/>
                    </Modul>
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Login