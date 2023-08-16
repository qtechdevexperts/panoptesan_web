import React from 'react'
import '../Login/LoginElements.css'
import eyelogo from '../../Assets/Images/eye_logo.png'

export const CreatePasswordElements = () => {
    return (
        <div className='card'>
            <h1>Create New Password</h1>

                <div className='password-box'>
                    <label htmlFor="password">Password:</label>
                    <br/>
                    <div>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                        <img src={eyelogo} />
                    </div>
                </div>

                <div className='password-box'>
                    <label htmlFor="password">Repeat Password:</label>
                    <br/>
                    <div>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                        <img src={eyelogo} />
                    </div>
                </div>

            <div className='linkbtn'>
            <button type="button" className="btn btn-primary">Continue</button>
            </div>
        </div>
    )
}