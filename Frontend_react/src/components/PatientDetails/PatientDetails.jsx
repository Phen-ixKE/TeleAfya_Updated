import React from "react";
import './PatientDetails.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box} from "@mui/material";


 
function PatientDetails () {
      
             return (
               <div>
               <Card style={{maxWidth:1800, maxHeight:100}}>
               <CardContent style={{display:'flex', flexDirection:'row', fontFamily:'Times New Roman'}}>
              
               <CardMedia style={{maxWidth:150, maxHeight:70}}
                component="img"
                alt="Logo"
             
                image="data:image/png;base64,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"
                title="Logo"
               />
               <h2 style={{marginLeft:450, color:'#C00100'}}>EQUITY AFYA MEDICAL</h2>
           
               </CardContent>

                </Card>
                <h3 style={{marginLeft:680, color:'orange'}}>PATIENT FILE</h3>
                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Patient name" style={{ marginLeft: 0 }}>
                Patient name:
               </label>
               <TextField
               id="Patient name"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Patient number" style={{ marginLeft: 20 }}>
                Patient no:
               </label>
               <TextField
               id="Patient number"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Diagnosis" style={{ marginLeft: 20 }}>
                Diagnosis:
               </label>
               <TextField
               id="Diagnosis"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Gender" style={{ marginLeft: 20 }}>
                Gender:
               </label>
               <TextField
               id="Gender"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Age" style={{ marginLeft: 20 }}>
                Age:
               </label>
               <TextField
               id="Age"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Contacts" style={{ marginLeft: 20 }}>
                Contacts:
               </label>
               <TextField
               id="Contacts"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                </div>
                <br></br><br></br><br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <a style={{color:"#C00100"}} href="/Referral Request Report">Referral Request Report</a>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="serviceProvider" style={{ marginLeft: 100 }}>
                Service provider:
               </label>
               <TextField
               id="serviceProvider"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Date" style={{ marginLeft: 100 }}>
                Date:
               </label>
               <TextField
               id="Date"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Time" style={{ marginLeft: 100}}>
                Time:
               </label>
               <TextField
               id="Time"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               <label htmlFor="Revisit no" style={{ marginLeft: 100 }}>
                Revisit no:
               </label>
               <TextField
               id="Revisit no"
               variant="standard"
               multiline
               rows={1}
               style={{ marginLeft: 20 }}
               />
                </div>
                
                </div>
                <h3 style={{ marginLeft:650,color:'#C00100',marginTop:40}}>DOCTOR'S NOTES</h3>
                <Box width={"100%"} >
                <TextField 
                autoFocus
               fullWidth
               multiline
               margin="normal"
              id="value"
              rows={8} 
              />
            </Box>
            <h3 style={{marginLeft:600, color:'#C00100'}}>INVESTIGATIONS AND LAB RESULTS</h3>
            <button style={{marginTop:40, color:'C00100'}}>Submit</button>
            <button style={{marginTop:40, color:'C00100'}}>Submit</button>j8SWHlZpKZTYMoIvOA9QFkaG



                </div>


             );




};

export default PatientDetails;