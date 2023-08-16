import React from 'react'
import loginBg from '../../Assets/Images/login_bg.png'
import companyLogo from '../../Assets/Images/company_logo.png'
import '../Login/Login.css'
import { LoginElements } from '../../Components/Login/index.js'
import { ForgotPasswordElements } from '../../Components/ForgotPassword'

export const ForgotPassword = ({role}) => {
    return (
        // <div className="flex-container">
        //     <div className="flex-item">
        //         <img className='loginBg' src={loginBg} /> 
        //     </div>
        //     <div className="flex-item">
        //         <div className='Login-right-container'>
        //             <img className='img-thumbnail' src={companyLogo} /><br />
        //             <div className='elements-container'>
                        <ForgotPasswordElements role={role}/>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}