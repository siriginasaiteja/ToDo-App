import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/navbar/navbar'
import Home from './components/home/home';
import Footer from './components/footer/footer';
import About from './components/about/about';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './components/sign-up-in/signup';
import Signin from './components/sign-up-in/signin';
import Todo from './components/todo/todo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { authActions } from './store';
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
function App() {

    const isLoggedIn=useSelector((state)=> state.isLoggedIn);
   const dispatch = useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
       dispatch(authActions.login());
    }
  },[]);
  
  return (
    <>
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/aboutus" element={<About/>}/>
        <Route exact path="/todo" element={isLoggedIn?<Todo/>:<Home/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  
      <Footer/>
    </>
  )
}

export default App
