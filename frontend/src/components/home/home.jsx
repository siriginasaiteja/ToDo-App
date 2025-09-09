import React from "react";
import './home.css';
import { useSelector } from "react-redux";

const Home=()=>{
    const isLoggedIn=useSelector((state)=> state.isLoggedIn);
    const user = sessionStorage.getItem("username") || "Guest";
    return(
        <>
        <div className=" home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center text">
                    Welcome, {user}!<br/>Organize your <br/>work and life,finally.
                </h1>
                <p className="text">Become focused, Organized, and calm with
                    <br/>todo app.The World's #1 task manager app.
                </p>
                {isLoggedIn ?
                <>
                <a href="todo">
                <button className="homebtn">Make Todo List</button>
                </a>
                </>:<>
                <a href="signup">
                <button className="homebtn">Make Todo List</button>
                </a>
                </>
            }
            </div>
        </div>

        </>
    )
}

export default Home
