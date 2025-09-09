import React from 'react'
import './about.css'
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className='about d-flex justify-content-center align-items-center'>
        <div className='container'>
        <div className='d-flex'>
        <h1>About Me</h1>
        </div>
        <p> With a passion for programming and a solid foundation in languages 
            such as java and javascript, With good knowledge in web development skills like
            Reactjs,Nodejs,Express,Mongodb and Mongoose, I am a dedicated graduate from 
            KL University, After completting BTech. I am eager to contribute my technical skills 
            and enthusiasm for problem-solving to real-world projects.My Linked In <br/>
            <a href='https://www.linkedin.com/in/saiteja-sirigina-603189226/'><FaLinkedin /></a></p>
        </div>
    </div>
  )
}

export default About