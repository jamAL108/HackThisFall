/* eslint-disable no-unused-vars */
// has all the routes
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Donor from '../components/Donor';
import Otppage from '../components/otppage';
import Location from '../components/Location'
import DonorLogin from '../components/donorLogin'
import { Dashboard } from '../components/Dashboard';
import NGOLogin from '../components/NGOlogin';



//// donor

import DonorDashboard from '../pages/donor/dashboard/page'
import DonorDonate from '../pages/donor/donate/page'
import DonorHistory from '../pages/donor/your-history/paget'
import DonorThankyou from '../pages/donor/thankyou/page'

/// ngo

import NgoDashboard from '../pages/NGO/dashboard/page'
import NgoHistory from '../pages/NGO/history/page'
import NgoDonation from '../pages/NGO/donations/page'
import NgoVerify from '../pages/NGO/verify/page'
import NgoThankyou from '../pages/NGO/thankyou/page'

const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/donor/dashboard',
        element: <DonorDashboard/>
    },
    {
        path:'/donor/donate',
        element: <DonorDonate/>
    },
    {
        path:'/donor/history',
        element: <DonorHistory/>
    },
    {
        path:'/donor/thankyou',
        element: <DonorThankyou/>
    },
    {
        path: '/otp',
        element: <Otppage/>
    },
    {
        path:'location',
        element: < Location/>
    },
    {
        path: '/auth/donor/login',
        element: <DonorLogin/>
    },{
        path:'/auth/ngo/login',
        element:<NGOLogin/>
    },{
        path:'/ngo/dashboard',
        element: <NgoDashboard/>
    },
    {
        path:'/ngo/history',
        element: <NgoHistory/>
    },
    {
        path:"/ngo/donation",
        element:<NgoDonation/>
    },{
        path:"/ngo/verify",
        element:<NgoVerify/>
    },{
        path:"/ngo/thankyou",
        element:<NgoThankyou/>
    }
]
export default routes;