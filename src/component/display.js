import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import './display.css'

const Display = () => {
  

  const [display, setDisplay] = useState({
    allData: [],
  });
const firstRender =useRef(true)
  useEffect(() => {
    if(firstRender.current) {
      getData();
      firstRender.current= false
    }
 
  }, []);

  let getData = () => {
    axios
      .get("https://data.covid19india.org/data.json")
      .then((response) => {
        const data = response.data;

        setDisplay({ allData: data.statewise });
      })
      .catch(() => {});
  };




  const tableHeader = ["state","active", "confirmed", "deaths","recovered"];

  const TableHeaderData = () => {
    return tableHeader.map((data, index) => <th>{data}</th>);
  };

  


  return (
    <div className="App">
    

      <Grid container justify="center">
        <Grid item xs={12} md={12}>
          <center>
            <div>
              <table id="tableFileData" style={{tableBorder:"1px"}}>
                <tr>{TableHeaderData()}</tr>

                <tbody>
                  {display.allData.slice(1).map((data, index  ) => (
                    
                    <tr keys={index}>
                    
                      <td >{data.state}</td>
                      <td>{data.active}</td>
                      <td>{data.confirmed}</td>
                      <td>{data.deaths}</td>
                      <td>{data.recovered}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </Grid>
      </Grid> 
     
    </div>
  );
};

export default Display;
