import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from '@material-ui/core';  
import CountUp from 'react-countup';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
let abc =[];
let Toss =[]
let Totalmap =[];
const useStyles = makeStyles((theme) => ({
  box: {
    
    [theme.breakpoints.down('md')]: {
     marginTop:"100px",
     
    },
    
  },
  map: {
    
    
    [theme.breakpoints.down('md')]: {
     
     
    },
    
  },
}));
const Map = () => {
  const classes = useStyles();
  const [mapsData, setMapsData]=useState()
  const [display, setDisplay] = useState({
    allData: [],
  });

  useEffect(() => {
    getData();

  }, []);

  let getData = () => {
    axios
      .get("https://data.covid19india.org/data.json")
      .then((response) => {
        const data = response.data;
      
        setDisplay({ allData: data.statewise });
        setMapsData( { allData: data.statewise[0] } );
      })
      .catch(() => {});
  };
  


  

  return (
    <div className="App">
    
          
          {display.allData.slice(0,1).map((data, index  ) => (
                <Grid container spacing={3} justify="center" className={classes.box}>
                    <Grid item component={Card} xs={11} md={2} style={{marginTop:"20px",marginLeft:"10px"}} >
                    <CardContent  >
                        <Typography style={{color:"orange"}}>Confirmed</Typography>
                        <Typography varaint="h5">
                            <CountUp start={0} end={data.confirmed} duration={2.5} separator=","/>
                            
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastupdatedtime).toDateString()}</Typography>
                        <Typography varaint="body2">Number of confirmed cases</Typography>
                    </CardContent>
                    
                  </Grid>
                  <Grid item component={Card} xs={11} md={2} style={{marginTop:"20px",marginLeft:"10px"}}>
                    <CardContent >
                        <Typography style={{color:"red"}}>active</Typography>
                        <Typography varaint="h5">
                            <CountUp start={0} end={data.active} duration={2.5} separator=","/>
                            
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastupdatedtime).toDateString()}</Typography>
                        <Typography varaint="body2">Number of active cases</Typography>
                    </CardContent>
                    
                  </Grid>
                  <Grid item component={Card} xs={11} md={2} style={{marginTop:"20px",marginLeft:"10px"}} >
                    <CardContent >
                        <Typography style={{color:"green"}}>recovered</Typography>
                        <Typography varaint="h5">
                            <CountUp start={0} end={data.recovered} duration={2.5} separator=","/>
                            
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastupdatedtime).toDateString()}</Typography>
                        <Typography varaint="body2">Number of recovered cases</Typography>
                    </CardContent>
                    
                  </Grid>
                  <Grid item component={Card} xs={11} md={2} style={{marginTop:"20px",marginLeft:"10px"}} >
                    <CardContent >
                        <Typography style={{color:"black"}}>deaths</Typography>
                        <Typography varaint="h5">
                            <CountUp start={0} end={data.deaths} duration={2.5} separator=","/>
                            
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastupdatedtime).toDateString()}</Typography>
                        <Typography varaint="body2">Number of deaths cases</Typography>
                    </CardContent>
                    
                  </Grid>
                  
                  </Grid>
                  ))}
                    
                   
             
     
    </div>
  );
};

export default Map;
