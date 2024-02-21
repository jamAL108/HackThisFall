/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import '../css/auth.css';
import { useNavigate } from 'react-router-dom'
import loginAPI from '../apis/login/donor'
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle  } from 'lucide-react'

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [request , setrequest] = useState(false)
    const [error , seterror] = useState("")
    const handleLogin = async () => {
        seterror("")
        setrequest(true)
        try {
            const response = await loginAPI({ email, password })
            console.log(response)
            if (response.success) {
                navigate('/donor/dashboard')
            }else{
                seterror("Invalid Credentials")
                setrequest(false)
            }
        } catch (err) {
            seterror("Server Issue")
            setrequest(false)
            console.error('Error:', err.message);
        }
    };

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <form className="login-form min-w-[400px]">
                <h2 className="text-[1.5rem] font-[500] ">Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="username" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error.length!==0 && (
                    <span className="pb-[10px] text-[#f44336] flex justify-center items-center gap-2 "><AlertCircle size={20} color='#f44336'/> {error}</span>
                )}

                <button className="bg-[#FFA732] hover:bg-[#EE9322] flex justify-center items-center gap-2 mb-[20px]" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
                    handleLogin()
                }}> <ColorRing
                        visible={request}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    />
                    Login</button>

            </form>
        </div>
    );
}

export default Login;