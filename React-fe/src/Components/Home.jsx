import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
const Navigate=useNavigate()
const naviagatebutton=()=>{
    Navigate('/login')
}
    
    return (
        <div className="welcome-container d-flex justify-content-center align-items-center">
          <div className=" text-white">
            <h1 className="display-3 ">Welcome</h1>
            <p className='lead'>Discover amazing features and join our community today.</p>
            <button onClick={naviagatebutton}className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      );
    }

export default Home

