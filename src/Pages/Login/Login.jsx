import React from 'react'
import loginBg from '../../Assets/Images/login_bg.png'
import companyLogo from '../../Assets/Images/company_logo.png'
import './Login.css'
import { LoginElements } from '../../Components/Login/index.js'

export const Login = ({role, setToken}) => {
    return (
            <LoginElements setToken={setToken} role={role}/>
    );
}