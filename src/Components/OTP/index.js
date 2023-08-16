import React from 'react'
import '../Login/index.css'

export const OTPElements = () => {
    return (
        
        <div className='card'>
            <h1>One Time Password</h1>
            <p>Enter your OTP </p>
                <div className='otp-box'>
                    <div className="otp-input">
                        <input type="password" maxLength="1" />
                        <input type="password" maxLength="1" />
                        <input type="password" maxLength="1" />
                        <input type="password" maxLength="1" />
                        <input type="password" maxLength="1" />
                        <input type="password" maxLength="1" />
                    </div>
                </div>

            <div className='linkbtn'>
            <button type="button" className="btn btn-primary">Continue</button>
            </div>
        </div>
    )
}