import axios from 'axios';
import React from 'react'
import { useState ,useEffect} from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import {toast } from 'react-toastify';
const Update = ({closeModal,update,fetchTasks}) => {

  useEffect(()=>{
    setInputs({title:update.title,body:update.body})
  },[update]);

  const [Inputs, setInputs] = useState({title:"",body:""})
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  }

  const submit=async()=>{
    await axios.put(`${import.meta.env.VITE_APP_SERVER_URL}/api/v2/updateTask/${update._id}`,Inputs)
    fetchTasks();
    toast.success("Your Task Is Updated");
    closeModal();

  }
  return (
    <>
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
        <h3>Update Your Task</h3>
        <input type='text' placeholder="TITLE" className='todo-updatein my-4 w-100 p-2' name='title' value={Inputs.title} onChange={change}/>
        <textarea  placeholder="Body" className='todo-updatein w-100 p-2'name='body' value={Inputs.body} onChange={change}/>
        <button className='btn-dark my-4' onClick={submit}>Update</button>
    </div>
    <div className="cancel-btn" onClick={closeModal} >
        <IoMdCloseCircleOutline />
    </div>
    </>
  )
}

export default Update