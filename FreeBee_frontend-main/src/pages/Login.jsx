import '../style/page1.css'
import React, { useState } from 'react'
import Donate from '../images/donate.jpg'
import Icon from '../images/gicon.jpg'
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Page1 = () => {
    // const [name, setName] = useState("")
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("")
    const LOGIN_URL = "http://127.0.0.1:8000/user/login_api/"
    const notifyError = (message) => toast.error(message);
    const notify = (message) => toast.success(message);
    function handleOptionChange(event) {
        setUserType(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var user_data = {
            // name: name,
            password: password,
            email: email,
            userType: userType,

        };
        console.log(user_data)
        axios
            .post(LOGIN_URL, user_data)
            .then(function (response) {
                if (response.data.status === "success") {
                    var data = response.data.data;
                    // console.log(data.is_donor);
                    localStorage.clear();
                    if(data.is_donor===true){
                        navigate('/donorform')
                    }else{
                        navigate('/orphanage')
                    }
                    notify("Logged in successfully");
                } else {
                    notifyError(response.data.errorMessage);
                }
                // setChangeMonitor(!changeMonitor);
            })
            .catch(function (err) {
                notifyError(err.response.status + " - " + err.response.statusText);
                // setIsProcessing(false);
            })
    }
    return (
        <div>
            <div class="bg">
                <div>

                    <img src={Donate} class="img-thumbnail" />
                </div>
                <div class="container">
                    <div class="input-box">
                        <header>LOGIN</header>
                    </div>
                    <form action="#" />
                    <div class="input-field">
                        <label for="email">EMAIL : </label>
                        <input type="email" class="input" id="email" placeholder="example@gmail.com"  required value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <div class="input-field2">
                        <label for="password">PASSWORD : </label>
                        <input type="password" class="input" name="password" id="password" placeholder="password" required value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>
                    <div class="rad">
                        <input type="radio" class="radiobutton" name="r1" value="Donor" checked={userType === 'Donor'} onChange={handleOptionChange} />
                        <label>DONOR</label>
                        <input type="radio" class="radio-button1" name="r1" value="Orphanage" checked={userType === 'Orphanage'} onChange={handleOptionChange} />
                        <label >ORPHANAGE</label>
                    </div>
                    <div class="inputfield1">
                        <input type="submit" class="submit" value="LogIn" onClick={handleSubmit}/>
                    </div>
                    <div class="orr">
                        <p>or</p>
                    </div>

                    <div>
                        <img src={Icon} class="icon" />
                    </div>

                    <div class="signin">
                        <span>Create new account <a href="#" onClick={() => { navigate("/signup") }}>SignUp</a></span>
                    </div>

                </div>
            </div>
        </div>


    );

}

export default Page1;
