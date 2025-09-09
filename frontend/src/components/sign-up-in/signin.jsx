import React from 'react'
import './signup.css'
import Headingcomp from './headingcomp'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
import {toast } from 'react-toastify';
const Signin = () => {
    const dispatch = useDispatch();

     const history=useNavigate();
    
        const [Inputs,setInputs] = useState({"email":"","password":""});
        const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
    };
 const submit = async (e) => {
    e.preventDefault();
     if (!Inputs.email || !Inputs.password) {
        toast.error("Fields should not be empty!");
        return; 
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/v1/login`, Inputs);
          if (response.data && response.data.others) {
            toast.success("Login Successful!");
             sessionStorage.setItem("id",response.data.others._id);
             sessionStorage.setItem("username",response.data.others.username);
             dispatch(authActions.login());
             setInputs({ "email": "", "password": "" });
              setTimeout(() => {
              history("/");
              },1500); 
          }else {
            toast.error("Login failed. Please check your credentials.");
        }


    } catch (error) {
        toast.error("An unexpected error occurred. Please try again..");
        console.error("Login error:", error);
    }
};
  return (
     <div className='signup'>
        <div className='container'>
            <div className='row'>
                 <div className='d-lg-block d-none col-lg-4 column d-lg-flex justify-content-center align-items-center'>
                   <Headingcomp first="Sign" second="In"/>
                </div>
                <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-5 signup-container'>
                        <input className='p-2 my-3 input-signup' 
                        type='email' 
                        placeholder='Enter Your Email' 
                        name='email'
                        value={Inputs.email}
                        onChange={change}/><hr/>
                        
                        <input className='p-2 my-3 input-signup' 
                        type='password' 
                        placeholder='Enter Your Password' 
                        name='password'
                        value={Inputs.password}
                        onChange={change}/>
                        <div className='btn-s'>
                        <button className='btn-signup p-2' onClick={submit}>sign In</button>
                        </div>
                        <div className='para'>
                            <p>New to TODO? <a href='signup'>Create an account</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin