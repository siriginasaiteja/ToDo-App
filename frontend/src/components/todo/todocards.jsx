import React from 'react'
import './todo.css'
import { MdDeleteOutline } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
const Todocards = ({title,body,id,delid,showUpdate}) => {
  return (

    <div className='p-3 todocard'>
        <div>
            <h5>{title}</h5>
            <p >{body}</p>
        </div>
        <div>
        <div className='d-flex justify-content-end '>
            <div className='d-flex justify-content-center align-items-center card-icon-head' onClick={showUpdate}>
                <button className='icon-btn-u'><GrDocumentUpdate className='card-icons '/>Update</button>
            </div>
            <div className='d-flex justify-content-center align-items-center card-icon-head' onClick={()=>{delid(id)}}>
                <button className='icon-btn-d'><MdDeleteOutline className='card-icons-del '/>Delete</button> 
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default Todocards