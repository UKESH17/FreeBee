import React, { useState } from 'react'
import '../style/donorform.css'
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const Donorform = () => {
  const [name,setName]=useState("")
  const [donorAddress,setDonorAddress]=useState("")
  const [city,setCity]=useState("Chennai")
  const [state,setState]=useState("Kerala")
  const [pincode,setPincode]=useState("")
  const [mobile_no,setMobile_no]=useState("")
  const [alt_mobile_no,setAltMobile_no]=useState("")
  const [email,setEmail]=useState("")
  const [items,setItems]=useState("")
  const [vechiles,setVechiles]=useState("")
  const DONORFORM_URL ="http://localhost:8000/donation/donor_api/"
  const notifyError = (message) => toast.error(message);
  const notify = (message) => toast.success(message);
  const handleCityChange=(e)=>{
    setCity(e.target.value)
  }
  const handleStateChange = (e) => {
    setState(e.target.value)
  }
  const navigate= useNavigate()

  function handleOptionChange(event) {
    setVechiles(event.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    var user_data = {
      name: name,
      address: donorAddress,
      city: city,
      state: state,
      pincode:pincode,
      mobile_no:mobile_no,
      alt_mobile_no: alt_mobile_no,
      email: email,
      items: items,
      vehicle_type: vechiles,
    };
    console.log(user_data)
    axios
      .post(DONORFORM_URL, user_data)
      .then(function (response) {
        if (response.data.status === "success") {
          var data = response.data.statusResponse;
          console.log(data);
          navigate("/orphanage_list")
          localStorage.setItem('donor_info', JSON.stringify(user_data));
          notify("Donor Details saved");
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
    <div class="donorform">
       <form action="#" class="donor">
    <div class="wrapper1">
        <div class="donortitle">
          Donar details
        </div>
        <div class="form1">
           <div class="donorinput">
              <label>DONOR NAME :</label>
              <input type="text" class="donordetails" required maxlength="40"  value={name} onChange={(e)=>{
                setName(e.target.value)
              }}/>
           </div>  
            <div class="donorinput">
              <label>ADDRESS :</label>
              <input type="text" class="donordetails" placeholder="Flatno/Streetname,Area" value={donorAddress} onChange={(e) => {
                setDonorAddress(e.target.value)
              }} />
           </div>  
           <div class="donorinput">
            <label>CITY :</label>
            <div class="custom_select">
                <select value={city} onChange={handleCityChange}>
                <option value="chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="salem">Salem</option>
              </select>
            </div>
           </div>  
            <div class="donorinput">
              <label>STATE :</label>
              <div class="custom_select">
                <select value={state} onChange={handleStateChange}>
                  <option value="kerala">Kerala</option>
                  <option value="tamilnadu">TamilNadu</option>
                  <option value="karnataka">Karnataka</option>
                </select>
              </div>
           </div> 
            <div class="donorinput">
              <label>PINCODE :</label>
              <input type="text" class="donordetails" value={pincode} onChange={(e) => {
                setPincode(e.target.value)
              }} />
           </div> 
          <div class="donorinput">
              <label>MOBILE NUMBER :</label>
              <input type="text" class="donordetails" required value={mobile_no} onChange={(e) => {
                setMobile_no(e.target.value)
              }} />
           </div> 
           <div class="donorinput">
            <label>ALTERNATIVE MOBILE NUMBER :</label>
              <input type="text" class="donordetails" value={alt_mobile_no} onChange={(e) => {
                setAltMobile_no(e.target.value)
              }} />
         </div> 
          
          <div class="donorinput">
              <label>EMAIL :</label>
              <input type="email" class="donordetails" required value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} />
           </div> 
          
           <div class="title2">
            DONATING ITEMS
          </div>
          <div class="donorinput2">
            <label>DONATING ITEMS :</label> 
              <input type="text" class="donordetails" placeholder="clothes/Stationary/sanitary/goods" value={items} onChange={(e) => {
                setItems(e.target.value)
              }} />
         </div>  
         <div class="donorinput3">
          <label>PICKUP VEHICLE :</label>
              <input type="radio" class="radio-button" name="r1" value="Small" checked={vechiles === 'Small'} onChange={handleOptionChange} />
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Small</label>
              <input type="radio" class="radio-button" name="r1" value="Medium" checked={vechiles === 'Medium'} onChange={handleOptionChange}/>
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Medium</label>
              <input type="radio" class="radio-button" name="r1" value="Large" checked={vechiles === 'Large'} onChange={handleOptionChange}/>
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Large</label>
          </div>

           <div class="donorinput">
            <input type="submit" value="SUBMIT" class="btn" onClick={handleSubmit}/>
          </div>
        </div>
    </div>
  </form>
    </div>
  )
}

export default Donorform