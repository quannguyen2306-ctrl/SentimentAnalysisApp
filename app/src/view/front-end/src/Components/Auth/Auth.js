import React from 'react'
import './Auth.css'
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";


const clientId = "561826027643-4limjsvo3q2nv8e8r94n9tlmn8b0vcf9.apps.googleusercontent.com";
const flag = false


const Auth = () => {


    const onSuccess = (res)=>{
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        <Link to ="/Option"></Link>
        flag = true;
    }


    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
        flag = false
    }




  return (
   
    <div className="container">  
      <div className="header">  
      <div className="ReturnHome"><Link to ="/">Return</Link></div>
        <div className="text">Welcome to our app!</div>  
        <div className="underline"></div>  
      </div>
      <div className='InsText'>Please sign in to your Youtube account before proceeding to the next step!</div>
      <div className="thisSection">
        <div className="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
      </div>
    </div>


  )
}


export default Auth


