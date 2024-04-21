import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Auth from './Components/Auth/Auth'
import Home from './Components/Home'
import Result1 from './Components/Results/Result1'
import Result2 from './Components/Results/Result2';

import Dashboard from './Components/Dashboard/Dashboard';
import Option from './Components/Option'
// import { useEffect } from 'react';
// import {gapi} from 'gapi-script';
{/* <script src="https://apis.google.com/js/client.js?onload=init"></script> */}

// const clientId = "561826027643-4limjsvo3q2nv8e8r94n9tlmn8b0vcf9.apps.googleusercontent.com"


function App() {


//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId: clientId,
//         scope: ""
//       })
//     }
   
//     gapi.load('client:auth2', start);
//   });
 
// //var accessToken = gapi.auth.getToken().access_Token;


  return (


    <Router>
      <Routes>
        <Route path = "/" element= {<Home/>}/>
        <Route path = "/dashboard" element= {<Dashboard/>}/>
        <Route path = '/Results/Result1' element = {<Result1/>} />
        <Route path = '/Results/Result2' element = {<Result2/>} />
        <Route path = '/Auth/Auth' element = {<Auth/>} />
        <Route path = '/Option' element = {<Option/>} />
      </Routes>
    </Router>


  );
}


export default App;








