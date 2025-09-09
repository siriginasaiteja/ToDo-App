import React, { useState } from 'react'
import './signup.css'
import Headingcomp from './headingcomp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';


const Signup = () => {

    const history=useNavigate();

    const [Inputs,setInputs] = useState({"email":"","username":"","password":""});
    const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
};
const submit = async (e) => {
    e.preventDefault();
     if (!Inputs.email || !Inputs.username || !Inputs.password) {
        toast.error("Fields should not be empty!");
        return; 
    }
     try {
        // The 'try' block will now only run if registration is successful (status 201)
        await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/v1/register`, Inputs);

        toast.success("Registration successful! Redirecting to sign in...");
        setInputs({ email: "", username: "", password: "" });

        setTimeout(() => {
            history("/signin");
        }, 2000);

    } catch (error) {
        // The 'catch' block will run for all errors (status 409, 500, etc.)
        if (error.response && error.response.data && error.response.data.message) {
            // Display the specific message sent from the backend
            toast.error(error.response.data.message);
        } else {
            // Handle network errors or other unexpected issues
            toast.error("Registration failed. Please try again.");
        }
        console.error("Registration error:", error);
    }
};


  return (
    <div className='signup'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-5 signup-container'>
                        <input className='p-2 my-3 input-signup' 
                        type='email' 
                        placeholder='Enter Your Email' 
                        name='email'
                        value={Inputs.email}
                        onChange={change}/><hr/>
                        
                        <input className='p-2 my-3 input-signup' 
                        type='username' 
                        placeholder='Enter Your username' 
                        name='username'
                        value={Inputs.username}
                        onChange={change}/><hr/>

                        <input className='p-2 my-3 input-signup' 
                        type='password' 
                        placeholder='Enter Your Password' 
                        name='password'
                        value={Inputs.password}
                        onChange={change}/>

                        <div className='btn-s'>
                        <button className='btn-signup p-2' onClick={submit}>sign up</button>
                        </div>
                         <div className='para'>
                            <p>Already have an Account? <a href='signin'>SignIn</a></p>
                        </div>
                    </div>
                </div>
                <div className='d-lg-block d-none col-lg-4 column d-lg-flex justify-content-center align-items-center'>
                   <Headingcomp first="Sign" second="Up"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup