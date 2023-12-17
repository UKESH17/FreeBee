import React, { useEffect, useState } from 'react'
import profile1 from '../images/orphpro1.jpg'
import profile2 from '../images/orphprofile.jpg'
import profile3 from '../images/orphpro2.jpg'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
// import '../style/orphanprofile.css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import axios from 'axios'
import { toast } from "react-toastify";
import Card from './OrphanageCard'
import OrphanageCard from './OrphanageCard'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Orphanprofile = () => {
  const [pincode, setPincode] = useState("")
  const [homeType, setHomeType] = useState("")
  function handleOptionChange(event) {
    setHomeType(event.target.value);
  }
  const FILTER_URL = "http://127.0.0.1:8000/donation/filter_orphanages/"
  const ORPHANAGEFORM_URL = "http://127.0.0.1:8000/donation/orphanage_api/"
  const notifyError = (message) => toast.error(message);
  const notify = (message) => toast.success(message);

  
  
  const [cardData, setCardData] = useState()
  const [elements, setElements] = useState([])
  const [monitor, setMonitor] = useState(0)
  // const OrphanageCard=(card,index)=>{
  //     return(
  //         <Grid item>
  //         <Box>
  //             <Paper elevation={3}>

  //                 <Grid
  //                     container
  //                     direction="row"
  //                     justifyContent="space-between"
  //                     alignItems="center"
  //                 >
  //                     <Grid item md={4}>

  //                         <img src={profile1} alt="img" style={{ width: "300px", height: "170px" }} />
  //                     </Grid>
  //                     <Grid item md={8}>

  //                         <Grid
  //                             container
  //                             direction="column"
  //                             justifyContent="space-between"
  //                             alignItems="flex-start"
  //                         >
  //                             <Grid item><Typography variant="h4" gutterBottom>
  //                                 {card.orphanage_name}
  //                             </Typography></Grid>
  //                             <Grid item>
  //                                 <Grid
  //                                     container
  //                                     direction="row"
  //                                     justifyContent="space-between"
  //                                     alignItems="flex-start"
  //                                     spacing={2}
  //                                 >
  //                                     <Grid item>
  //                                         <Grid
  //                                             container
  //                                             direction="column"
  //                                             justifyContent="flex-start"
  //                                             alignItems="flex-start"
  //                                         >
  //                                             <Grid item><b>
  //                                                 Email
  //                                             </b></Grid>
  //                                             <Grid item> <Typography variant="body2" gutterBottom>
  //                                                 {card.orphanage_email}
  //                                             </Typography></Grid>
  //                                         </Grid>

  //                                     </Grid>
  //                                     <Grid item><Grid
  //                                         container
  //                                         direction="column"
  //                                         justifyContent="center"
  //                                         alignItems="center"
  //                                     >
  //                                         <Grid item><b>Phone Number</b>

  //                                         </Grid>
  //                                         <Grid item> <Typography variant="body2" gutterBottom>
  //                                             {card.orphanage_mobile}
  //                                         </Typography></Grid>
  //                                     </Grid></Grid>
  //                                     <Grid item><Button variant='contained'>Donate</Button></Grid>

  //                                 </Grid>
  //                             </Grid>

  //                         </Grid>


  //                     </Grid>
  //                 </Grid>
  //             </Paper>
  //         </Box>
  //         </Grid>
  //     )
  // }
  // const rows = [
  //     {
  //         orphanage_name: "",
  //         orphanage_email: "",
  //         orphanage_mobile: "",
  //     },]
  useEffect(() => {
    axios
      .get(ORPHANAGEFORM_URL)
      .then((response) => {
        if (response.data.status === "success") {
          // notify("working");
          var data = response.data.data;
          var temp = []
          for (var i in data) {
            temp.push(
              <OrphanageCard
                key={i}
                name={data[i].name}
                mobile={data[i].mobile_no}
                email={data[i].email}
              />
            )
          }
          setElements(temp);
        } else {
          notifyError(response.data.errorMessage);
        }
      })
      .catch((err) => {
        notifyError(err.response.status + " - " + err.response.statusText);
      });
  }, []);

  function handleFilter() {
    var filter_data = {
      pincode: pincode,
      homeType: homeType,
    };
    console.log(filter_data)
    axios
      .post(FILTER_URL, filter_data)
      .then(function (response) {
        if (response.data.status === "success") {
          var data = response.data.data;
          var temp = []
          for (var i in data) {
            temp.push(
              <OrphanageCard
                key={i}
                name={data[i].name}
                mobile={data[i].mobile_no}
                email={data[i].email}
              />
            )
          }
          setElements(temp);
          notify("Filtered output");
        } else {
          notifyError(response.data.errorMessage);
        }
      })
      .catch(function (err) {
        notifyError(err.response.status + " - " + err.response.statusText);
      })
  }

  return (
    <>
      <Container sx={{my:2}}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4" gutterBottom>
                Select an Orphanage to Donate
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid item><TextField id="outlined-basic" label="Pincode" variant="outlined" onChange={(e) => { setPincode(e.target.value) }} /></Grid>
              <Grid item>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Home Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="Child" control={<Radio />} label="Child" onChange={handleOptionChange} />
                    <FormControlLabel value="Old Age Home" control={<Radio />} label="Old Age Home" onChange={handleOptionChange} />
                    <FormControlLabel value="other" control={<Radio />} label="Others" onChange={handleOptionChange} />

                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item><Button variant="contained" startIcon={<FilterAltOutlinedIcon />} onClick={handleFilter}>
                Filter
              </Button></Grid>
            </Grid>
          </Grid>
          {/* {cardData.map(OrphanageCard)} */}
          {elements}
          {/* [
          <OrphanageCard />,
          <OrphanageCard />,
          ] */}
          {/* <Grid item><Box>
                        <Paper elevation={3}>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item md={4}>

                                    <img src={profile2} alt="img" style={{ width: "300px", height: "170px" }} />
                                </Grid>
                                <Grid item md={8}>

                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                    >
                                        <Grid item><Typography variant="h4" gutterBottom>
                                            Orphanage Name
                                        </Typography></Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="flex-start"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        justifyContent="flex-start"
                                                        alignItems="flex-start"
                                                    >
                                                        <Grid item><b>
                                                            Email
                                                        </b></Grid>
                                                        <Grid item> <Typography variant="body2" gutterBottom>
                                                            kaushik@gmail.com
                                                        </Typography></Grid>
                                                    </Grid>

                                                </Grid>
                                                <Grid item><Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item><b>Phone Number</b>

                                                    </Grid>
                                                    <Grid item> <Typography variant="body2" gutterBottom>
                                                        +91 9789043656
                                                    </Typography></Grid>
                                                </Grid></Grid>
                                                <Grid item><Button variant='contained'>Donate</Button></Grid>

                                            </Grid>
                                        </Grid>

                                    </Grid>


                                </Grid>
                            </Grid>
                        </Paper>
                    </Box></Grid>
                    <Grid item><Box>
                        <Paper elevation={3}>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item md={4}>

                                    <img src={profile3} alt="img" style={{ width: "300px", height: "170px" }} />
                                </Grid>
                                <Grid item md={8}>

                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                    >
                                        <Grid item><Typography variant="h4" gutterBottom>
                                            Orphanage Name
                                        </Typography></Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="flex-start"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        justifyContent="flex-start"
                                                        alignItems="flex-start"
                                                    >
                                                        <Grid item><b>
                                                            Email
                                                        </b></Grid>
                                                        <Grid item> <Typography variant="body2" gutterBottom>
                                                            kaushik@gmail.com
                                                        </Typography></Grid>
                                                    </Grid>

                                                </Grid>
                                                <Grid item><Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item><b>Phone Number</b>

                                                    </Grid>
                                                    <Grid item> <Typography variant="body2" gutterBottom>
                                                        +91 9789043656
                                                    </Typography></Grid>
                                                </Grid></Grid>
                                                <Grid item><Button variant='contained'>Donate</Button></Grid>

                                            </Grid>
                                        </Grid>

                                    </Grid>


                                </Grid>
                            </Grid>
                        </Paper>
                    </Box></Grid> */}


        </Grid>
      </Container>
    </>
  )
}

export default Orphanprofile