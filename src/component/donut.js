import DonutChart from "react-donut-chart";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const confirmed = [];
const active = [];
const deaths = [];
const recovered = [];

const useStyles = makeStyles((theme) => ({
  box: {
    
    [theme.breakpoints.up("md")]: {
      marginTop: "-160px",
      marginLeft: "-20px",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "-100px",
    },
  },
  map: {
   
    [theme.breakpoints.up("md")]: {
      marginLeft: "150px",
      marginTop: "15px",
    },
  },
  text: {
    
    [theme.breakpoints.up("md")]: {
      marginTop: "-160px",
      marginLeft: "-300px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "11px",
      marginTop: "-290px",
      marginLeft: "100px",
    },
  },
}));
const Donut = () => {
  const classes = useStyles();
  const [display, setDisplay] = useState({
    allData: [],
  });
  

  useEffect(() => {
    getData();
  }, []);

  let getData = () => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        const data = response.data;

        setDisplay({ allData: data.statewise });
      })
      .catch(() => {});
  };
  
  display.allData.slice(0, 1).map((data, index) => {
    confirmed.push(data.confirmed);
    active.push(data.active);
    deaths.push(data.deaths);
    recovered.push(data.recovered);
   
    
  });
  const tt = [
    { region: "active", val: parseInt(active) },
    { region: "deaths", val: parseInt(deaths) },
    { region: "recovered", val: parseInt(recovered) },
  ];

const mapData =()=>{
  return(
     <div>
    <p style={{ color: "orange" }}>confirmed : {confirmed.slice(-1)}</p>
    <p style={{ color: "#42A5F5" }}>active : {active.slice(-1)}</p>
    <p style={{ color: " rgb(255,112,67)" }}>deaths : {deaths.slice(-1)}</p>
    <p style={{ color: "green" }}>recovered : {recovered.slice(-1)}</p>
    </div>
  )
}

 
  return (
    <div className="App">
      <Paper>
        <Grid container justify="center">
          <Grid item xs={8} md={3} className={classes.box}>
            
            <Chart data={tt} size="200px">
              <PieSeries
                valueField="val"
                argumentField="region"
                innerRadius={0.6}
                style={{ height: "100px" }}
                size="200px"
              />

              <Animation />
            </Chart>
          </Grid>
          <Grid item xs={12} md={6} className={classes.map}>
            <Line
              data={{
               
                datasets: [
                  {
                    data: display.allData.slice(1).map(({ active }) => active),
                    label: "active",
                    borderColor: "blue",
                   
                  },
                  {
                    data: display.allData.slice(1).map(({ deaths }) => deaths),
                    label: "deaths",
                    borderColor: "grey",
                    
                  },
                  {
                    data: display.allData
                      .slice(1)
                      .map(({ recovered }) => recovered),
                    label: "recovered",
                    borderColor: "green",
                   
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.text}>
            
          {mapData()}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Donut;
