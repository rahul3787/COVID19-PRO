import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937],
};
const useStyles = makeStyles((theme) => ({
  box: {
    
   
    [theme.breakpoints.down('md')]: {
     marginTop:"800px",
     
    },
    [theme.breakpoints.up('md')]: {
      marginTop:"-100px",
      
     },
     
    
  },
  map: {
    
   
    [theme.breakpoints.down('md')]: {
     
     
    },
    
  },
}));

const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "#EEE";

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "red",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

let mapdataaa = [];

function TestMap() {
  const classes = useStyles();
  const [tooltipContent, setTooltipContent] = useState("");

  const [display, setDisplay] = useState({
    allData: [],
  });
  const [newData, setNewData] = useState("");
  useEffect(() => {
    getData();
  }, []);

  let getData = () => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        const data = response.data;

        setDisplay({ allData: data.statewise.slice(1) });
        display.allData.map((data, index) =>
          setNewData({
            id: data.statecode,
            state: data.state,
            value: {
              confirmed: data.confirmed,
              active: data.active,
              recovered: data.recovered,
              deceased: data.deceased,
            },
          })
        );
      })
      .catch(() => {});
  };
  
  mapdataaa.push({});
  display.allData.map((data, index) => {
    mapdataaa.push({
      id: data.statecode,
      state: data.state,
      value: {
        confirmed: data.confirmed,
        active: data.active,
        recovered: data.recovered,
        deceased: data.deaths,
      },
    });
  });
  const temp = mapdataaa.slice(3, -1);
 


  const colorScale = scaleQuantile()
    .domain(temp.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.name}: confirmed: ${current.value.confirmed}, active: ${current.value.active}, recovered: ${current.value.recovered}, deaths: ${current.value.deceased}`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div>
      <Grid container spacing={3} justify="center" className={classes.box}>
        <h1>India</h1>
        <Grid item xs={12} md={12}>
          <ReactTooltip>{tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={220}
            height={220}
            data-tip=""
          >
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  //console.log(geo.id);
                  const current = temp.find((s) => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default TestMap;
