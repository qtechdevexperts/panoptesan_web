import React from 'react'
import './Home.css'
import company_logo from '../../Assets/Images/company_logo.png'
import home_logo from '../../Assets/Images/home_logo.png'
import profile_logo from '../../Assets/Images/profile_logo.png'
import archive_logo from '../../Assets/Images/archive_logo.png'
import subscription_logo from '../../Assets/Images/subscription_logo.png'
import terms_logo from '../../Assets/Images/terms_logo.png'
import about_logo from '../../Assets/Images/about_logo.png'
import privacy_logo from '../../Assets/Images/privacy_logo.png'
import settings_logo from '../../Assets/Images/settings_logo.png'
import faq_logo from '../../Assets/Images/settings_logo.png'
import verify_logo from '../../Assets/Images/verify_logo.png'
import crash_logo from '../../Assets/Images/crash_logo.png'
import logout_logo from '../../Assets/Images/logout_logo.png'
import fleet_logo from '../../Assets/Images/fleet_logo.png'
import invite_logo from '../../Assets/Images/invite_logo.png'
import bell_logo from '../../Assets/Images/bell_logo.png'
import profile_image from '../../Assets/Images/profile_image.png'
import { HomeComponents } from '../../Components/Home/index.js'
import { Layout } from '../Layout/Layout'
import { Navbar } from '../../Components/Navbar'

export const Home = ({role}) => {
    return (
        <div>
            <Layout role={role}>
                <HomeComponents />
            </Layout>
        </div>
    )
}