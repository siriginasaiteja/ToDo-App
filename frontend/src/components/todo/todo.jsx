import React, { useState,useEffect} from 'react'
import './todo.css'
import Todocards from './todocards';
import {toast } from 'react-toastify';
import Update from './update';
import axios from 'axios';
const Todo = () => {
    const[Inputs,setInputs]=useState({title:"",body:""})
    const [Array,setArray]=useState([]);

    const [toUpdate, setToUpdate] = useState(null);
     const [isUpdateVisible, setUpdateVisible] = useState(false);
    
    const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
    }

    const submit=async()=>{
        if(Inputs.title==="" || Inputs.body ===""){
            toast.error("Title or Body Should Not Be Empty" );
        }else{
            const id = sessionStorage.getItem("id"); 
            if(id){
                await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/v2/addTask`,{title:Inputs.title,body:Inputs.body,id:id});
                setInputs({title:"",body:""});
                fetchTasks();
                toast.success("Your Task Is Added");
            }else{
                setArray([...Array,Inputs]);
                setInputs({title:"",body:""});
                toast.success("Your Task Is Added");
                toast.error("Your Task is Not Saved! Please SignUp");
            }
        }
    };

    const show=()=>{
        document.getElementById("textarea").style.display="block"
    }

    const del=async(cardid)=>{
         const id = sessionStorage.getItem("id"); 
        if(id){
            try {
                await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/api/v2/deleteTask/${cardid}`,{data:{id:id}})
                fetchTasks(); 
                toast.success("Task Deleted");
            } catch (error) {
            toast.error("Failed to delete task.");
            console.error("Deletion failed:", error);
            }
        }else{
            toast.error("Please SignUp First");
        }
    }

    const openUpdate=async(value)=>{
        setToUpdate(Array[value]);
        setUpdateVisible(true);
    }

    const closeUpdate=async()=>{
        setUpdateVisible(false);
        setToUpdate(null);
    }

     const fetchTasks = async () => {
        const id = sessionStorage.getItem("id");
        if (id) {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/api/v2/getTasks/${id}`);
            setArray(response.data.list);
        }
    };

       useEffect(() => {
        fetchTasks();
    }, []);

  return (
    <>
    <div className='todo'>
        <div className='todo-main container d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column todo-in-div w-100'>
            <input type='text' placeholder='TITLE' className='p-2 todo-in' onClick={show} onChange={change} name='title' value={Inputs.title}/>
            <textarea id='textarea' type='text' placeholder='Enter your Task details within 1 to 60 characters.'  maxLength="60" className='p-2 todo-in' onChange={change} name='body' value={Inputs.body} />
            <button className='addtaskbtn' onClick={submit}>Add Task</button>
            </div>
        </div>
        <div className="todo-body">
            <div className="container-fluid">
                <div className="row">
                         {Array && 
                Array.map((item,index)=>(
                     <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2 taskcard" key={index}>
                    <Todocards title={item.title} body={item.body} id={item._id} delid={del} showUpdate={()=>openUpdate(index)}/>
                    </div>
                    
                ))}
                </div>
               
            </div>
        </div>
    </div>
    {isUpdateVisible &&
    <div className="todo-update" id='todo-update'>
        <div className="container update">
             <Update closeModal={closeUpdate} update={toUpdate} fetchTasks={fetchTasks}/>
        </div>
    </div>
}
    </>
  )
}

export default Todo