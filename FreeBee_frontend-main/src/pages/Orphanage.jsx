import React, { useState } from 'react'
import '../style/orphanage.css'
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const Orphanage = () => {
  const [name, setName] = useState("")
  const [Address, setAddress] = useState("")
  const [city, setCity] = useState("Chennai")
  const [state, setState] = useState("Kerala")
  const [pincode, setPincode] = useState("")
  const [mobile_no, setMobile_no] = useState("")
  const [landline_no, setLandline_no] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  
  const [homeType, setHomeType] = useState("")
  const navigate= useNavigate()
  
  const ORPHANAGEFORM_URL = "http://127.0.0.1:8000/donation/orphanage_api/"
  const notifyError = (message) => toast.error(message);
  const notify = (message) => toast.success(message);
  const handleCityChange = (e) => {
    setCity(e.target.value)
  }
  const handleStateChange = (e) => {
    setState(e.target.value)
  }


  function handleOptionChange(event) {
    setHomeType(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    var user_data = {
      name: name,
      address: Address,
      city: city,
      state: state,
      pincode: pincode,
      mobile_no: mobile_no,
      landline_no: landline_no,
      email: email,
      homeType: homeType,
      image:image,
    }; 
    
    console.log(user_data)
    axios
      .post(ORPHANAGEFORM_URL, user_data)
      .then(function (response) {
        if (response.data.status === "success") {
          var data = response.data.statusResponse;
          console.log(data);
          navigate("/")
          notify("Orphanage Profile has been setup successfully");
          
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
    <div class="orphform">  
        <form action="#" class="orph"/>
        <div class="wrapper-orph">
        <div class="title">
          Orphanage Form
        </div>
        <div class="form">
           <div class="inputfield">
              <label>HOME NAME :</label>
            <input type="text" class="input" required maxlength="40" value={name} onChange={(e) => {
              setName(e.target.value)
            }} />
           </div>  
            <div class="inputfield">
              <label>ADDRESS :</label>
            <input type="text" class="input" placeholder="Flatno/Streetname,Area" value={Address} onChange={(e) => {
              setAddress(e.target.value)
            }} />
           </div>  
           <div class="inputfield">
            <label>CITY :</label>
            <div class="custom_select">
              <select value={city} onChange={handleCityChange}>
                <option value="chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="salem">Salem</option>
              </select>
            </div>
           </div>  
            <div class="inputfield">
              <label>STATE :</label>
              <div class="custom_select">
              <select value={state} onChange={handleStateChange}>
                  <option value="kerala">Kerala</option>
                  <option value="tamilnadu">TamilNadu</option>
                  <option value="karnataka">Karnataka</option>
                </select>
              </div>
           </div>
           <div class="inputfield">
            <label>PINCODE :</label>
            <input type="text" class="input" value={pincode} onChange={(e) => {
              setPincode(e.target.value)
            }} />
         </div> 
        <div class="inputfield">
            <label>MOBILE NUMBER :</label>
            <input type="text" class="input" required value={mobile_no} onChange={(e) => {
              setMobile_no(e.target.value)
            }} />
         </div> 
         <div class="inputfield">
          <label>LANDLINE NUMBER :</label>
            <input type="text" class="input" value={landline_no} onChange={(e) => {
              setLandline_no(e.target.value)
            } }/>
       </div> 
        
        <div class="inputfield">
            <label>EMAIL :</label>
            <input type="email" class="input" required value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
         </div>
         <div class="donorinput3">
          <label>HOME TYPE :</label>
            <input type="radio" class="radio-button" name="r1" value="Child"checked={homeType === 'Child'} onChange={handleOptionChange} />
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Child</label>
            <input type="radio" class="radio-button" name="r1" value="Old age" checked={homeType === 'Old age'} onChange={handleOptionChange} />
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Old age</label>
            <input type="radio" class="radio-button" name="r1" value="Others" checked={homeType === 'Others'} onChange={handleOptionChange} />
              <label style={{marginRight: "10px", color: "black", fontSize: "17px"}} >Others</label>
          </div> 
         <div class="upload">
          <button type="button" class="btn-warning">
          <i class="fa fa-upload"></i> Upload Photo 
              <input type="file" onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]))
                
              }} />
              {image}
          </button>
          <div class="inputfield">
              <input type="submit" value="SUBMIT" class="btn" onClick={handleSubmit}/>
          </div>
         </div>
          </div> 
          </div>
          </div>
  )
}

export default Orphanage;