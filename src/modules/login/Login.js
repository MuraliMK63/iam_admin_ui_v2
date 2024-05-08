import React from "react";
import { useNavigate } from "react-router-dom";

import LoginImg from '../../assets/images/login.png';
import LoginService from "./LoginService";
import './Login.css';

const loginService = new LoginService();

function LoginForm() {

    const navigate = useNavigate();

    const togglePassword = () => {
        let password = document.getElementById('exampleInputPassword1');
        password.type = password.type === 'text' ? 'password' : 'text'
    };

    const formHandler = (e) => {
        e.preventDefault();
        let username = e.target.elements[0].value;
        let password = e.target.elements[1].value;
        let payload = {username: username, password: password}
        loginService.verifyUser(payload)
                    .then((res) => {
                        if(res.status === 202){ 
                            localStorage.setItem('userid', res.data.id)
                            res.data.role === 'Admin' ? navigate('/admin') : navigate('/user')
                            
                        }
                        else{
                            alert(res.data)
                        }
                    })
                    .catch((err) => alert(err))

    }


    return (
        <form className="formStyle" onSubmit={formHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input mt-4" id="exampleCheck1" onClick={togglePassword}/>
                <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
            </div>
            <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary d-block">Submit</button>
            </div>
        </form>
    )
}

export default function Login() {
    return (
        <div className="row position-fixed top-0 bottom-0 start-0 end-0 overflow-auto" >
            <div className="col-sm-6 d-sm-block d-none" >
                <img src={LoginImg} alt="login_image" className="w-100"></img>
            </div>
            <div className="col-sm-6 overflow-auto rounded " style={{backgroundColor: '#c5ded2'}}>
                <div className="mt-5 mb-5" >
                    <div className="w-75 h-75 m-auto bg-white p-4 rounded">
                        <h3 className="pb-5 text-center">Welcome to Iam Admin</h3>
                        <h4 className="pb-2">Sign in</h4>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}