
import React, { useEffect, useRef, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import '../../Styles/Login.css';
import axios from '../../api/axios';
import Notification from '../Utils/Notification';

const LOGIN_URL = '/auth/signin';



export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();

    const [user, setUser] = useState('');
    const [passw, setPassw] = useState('');
    

    const [visibleNot, setVisibleNot] = useState(false);
    const [textNot, setTextNot] = useState("");


    const [flag, setFlag] = useState(false);

    const toggleShow = () =>{
        setVisibleNot(visible => !visible);
      }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setTextNot('');
    }, [user, passw])


    const formSubmit = async (e) => {
        setFlag(true);
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                {
                    email: user,
                    password: passw,
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    withCredentials: true,
                });

            const access_token = response?.data?.access_token;

            localStorage.setItem("access_token", access_token);


            navigate(from, { replace: true });



        } catch (error) {

            if (!error?.response) {
                setTextNot('No Server Response');
            } else if (error.response?.status === 403) {
                setTextNot('Wrong Username or Password');
            } else {
                setTextNot('Login Failed');
            }
            setVisibleNot(true);
            setTimeout(() => {
                setVisibleNot(false);
                
              }, 3000);
            setFlag(false);
            
        }
    }

    const signGuest = async (e) => {
        setFlag(true);
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                {
                    email: "guest@gmail.com",
                    password: "123",
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    withCredentials: true,
                });
            const access_token = response?.data?.access_token;

            localStorage.setItem("access_token", access_token);

            navigate(from, { replace: true });

        } catch (error) {
            if (!error?.response) {
                setTextNot('No Server Response');
            } else if (error.response?.status === 403) {
                setTextNot('Wrong Username or Password');
            } else {
                setTextNot('Login Failed');
            }
            setVisibleNot(true);
            setTimeout(() => {
                
                setVisibleNot(false);
              }, 3000);
              setFlag(false);
        }
    }


    return (
        <>
            <section>
                {textNot && (
                                <Notification type={"error"} message={textNot} status={visibleNot} toggleShow={toggleShow}/>
                 )}
                <div className={`wrapper ${flag ? 'hover:cursor-wait' : ''} `}>
                    <div className="">                        
                        <div className="login-box relative px-12">

                            <form onSubmit={formSubmit} className='flex flex-col items-center justify-center'>
                                <h2 className='login-text'>Login</h2>

                                <div className="input-box w-[310px] max-[400px]:w-full"> <span className="icon">
                                    <IoMdMail/>
                                </span>
                                    <input
                                        type="email"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required />
                                    <label>Email</label>
                                </div>

                                <div className="input-box w-[310px] max-[400px]:w-full"> <span className="icon">
                                    <FaLock/>
                                </span>
                                    <input type="password" id="password" autoComplete="off" onChange={(e) =>
                                        setPassw(e.target.value)} value={passw} required />
                                    <label>Password</label>
                                </div>
                                <button className="buttonLogin mt-4" type='submit'>Sign In</button>
                                <div className="register-link">
                                    <p>Don't have an account? <a className={`${flag ? 'cursor-wait' : 'cursor-pointer'} `} onClick={signGuest}>Sign as guest</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                   

                </div>
            </section>
        </>
    );

}