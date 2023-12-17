import '../style/page2.css'
import React, { useState } from 'react'
import Signup from '../images/Hands2.jpg'
import Icon from '../images/gicon.jpg'
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const Page2 = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("")
    const SIGNUP_URL = "http://127.0.0.1:8000/user/signup_api/"
    const notifyError = (message) => toast.error(message);
    const notify = (message) => toast.success(message);
    function handleOptionChange(event) {
        setUserType(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var user_data = {
            name: name,
            password: password,
            email: email,
            userType:userType,

        };
        console.log(user_data)
        axios
            .post(SIGNUP_URL, user_data)
            .then(function (response) {
                if (response.data.status === "success") {
                    var data = response.data.statusResponse;
                    console.log(data);
                    notify("Added user successfully");
                    navigate('/login')
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
            <div class="bg1">
                <div>
                    <img src={Signup} class="thumbnail" />
                </div>
                <div class="wrapper">
                    <div class="inputbox">
                        <header>SIGNUP</header>
                    </div>
                    <form action="#" />
                    <div class="infield6">
                        <label for="name">NAME : </label>
                        <input type="text" class="in" id="name" placeholder="enter the name" required value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>

                    <div class="infield3">
                        <label for="email">EMAIL : </label>
                        <input type="email" class="in" id="email" placeholder="navyaa23@gmail.com" required value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <div class="infield4">
                        <label for="password">PASSWORD : </label>
                        <input type="password" class="in" name="password" id="password" placeholder="password" required value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>
                    <div class="button">
                        <input type="radio" class="radio1" name="r1" value="Donor" checked={userType === 'Donor'} onChange={handleOptionChange} />
                        <label >DONOR</label>
                        <input type="radio" class="radio2" name="r1" value="Orphanage" checked={userType === 'Orphanage'} onChange={handleOptionChange} />
                        <label>ORPHANAGE</label>
                    </div>
                    <div class="infield5">
                        <input type="submit" class="submits" value="SIGNUP" onClick={handleSubmit} />
                    </div>
                    <div class="orrr">
                        <p>or</p>
                    </div>

                    <div>
                        <img src={Icon} class="icon1" />
                    </div>


                    <div class="signinn">
                        <span>Aldready a user <a href="#" onClick={() => { navigate("/login") }}>LogIn</a></span>
                    </div>


                </div>
            </div>
        </div>
    );

}

export default Page2;
