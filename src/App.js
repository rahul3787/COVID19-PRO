import logo from './logo.svg';
import  Display from './component/display'
import  Map from './component/map'
import  TestMap from './component/testmap'
import  Donut  from './component/donut'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} style={{height:"400px"}}>
             <Donut  />
        </Grid>
        <Grid item xs={12} sm={6}>
              <Map />
        </Grid>
        <Grid item xs={12} sm={6} style={{height:"800px"}}>
             <Display />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TestMap />
        </Grid>
        </Grid>
    </div>
  );
}

export default App;
