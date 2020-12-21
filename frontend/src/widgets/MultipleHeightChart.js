import React, { useState, useContext, useEffect } from 'react'
import { RideContext } from '../contexts/RideContext';
import CanvasJSReact from '../assets/canvasjs.react';
import RideAPI from '../apis/rideController';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



const HALFWEEKSEC = 302400;
const HALFMONTHSEC = 1314000;
const HALFYEARSEC = 15770000;



export default function MultipleHeightChart() {
  // console.log('RIDESTATE IN HEIGHTCHART 18', rideState)
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('month');
  const [metric, setMetric] = useState(true);

  const { rideState } = useContext(RideContext)
  const { startTime, endTime, rideId, loc1, heightSmartfin } = rideState;
  const startTimeUnix = new Date(startTime).getTime() / 1000;
  const endTimeUnix = new Date(endTime).getTime() / 1000;

  const queries = {
    week: {
      start: startTimeUnix - HALFWEEKSEC,
      end: endTimeUnix + HALFWEEKSEC 
    },
    month: {
      start: startTimeUnix - HALFMONTHSEC,
      end: endTimeUnix + HALFMONTHSEC 
    },
    month: {
      start: startTimeUnix - HALFYEARSEC,
      end: endTimeUnix + HALFYEARSEC 
    },         
  }

  console.log('chart data AAAAAAAAAAAAAAAAAAAAA', chartData.length)

  useEffect(() => {
    fetchChartData()
    .then(data => buildChartData(data));
  }, [chartType])
      
  function buildChartData(plotpoints) {
    let options = {
      axisX: {
        lineColor: '#CCCCCC',
        valueFormatString: "MMM DD"
      },
      axisY: {
        minimum: 0,
        lineColor: '#CCCCCC',
        gridColor: '#CCCCCC',
        tickColor: '#CCCCCC',
        labelFormatter: function ( e ) {
          return e.value + "m";  
        },
        interval: .1,
      },
      backgroundColor: '#f0f8ff',
      data: [{
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'line',
        dataPoints: plotpoints.map(data => (
          { 
            x: data.time, 
            y: data.height, 
            rideId: data.rideId, 
            location: data.location 
          }
        )),
        lineColor: '#CCCCCC',
      }],
      dataPointMinWidth: 70,     
      toolTip: {
        content: metric ? "Session #{rideId}, {location} {y}m" : "{y}ft"
      },
      zoomEnabled: true,

    }
    setChartData(options);
  }
  
  async function fetchChartData() {
    let {start, end} = queries[chartType];
    console.log(start, end)
    let dateResponse = await RideAPI.getRideByTime(start, end);
    if (dateResponse.status) {
      dateResponse = dateResponse.data;
      console.log('date response mhc 52', dateResponse)
       // TEMP CODE GET RID OF WHEN I SEND ERROR CODES BACK
       if (Object.keys(dateResponse)[0] === 'Error') {
        dateResponse = [];
      }
    } else {
      dateResponse = [];
    }
    let locationResponse = await RideAPI.getRideByLocation(loc1);
    if (locationResponse.status) {
      locationResponse = locationResponse.data;
      // TEMP CODE GET RID OF WHEN I SEND ERROR CODES BACK
      if (Object.keys(locationResponse)[0] === 'Error') {
        locationResponse = [];
      }
      console.log('locationresponse mhc 59', locationResponse)
    } else {
      locationResponse = [];
    }
    let dateIds = dateResponse.map(ride => (ride.rideId));
    let intersection = locationResponse.filter(x => dateIds.includes(x.rideId));
    console.log('retiurning intersection');
    console.log('before mapping to time and height', intersection)

    if (intersection) {
      intersection = intersection.map(ride => (
        { 
          time: unixToDatetime(ride.startTime), 
          height: ride.heightSmartfin,
          rideId: ride.rideId,
          location: ride.loc1,
        }
      ));
      intersection.sort((a, b) => (a.time > b.time) ? 1 : -1)
    }
    console.log('after mapping to time and height', intersection)
    return intersection;
  }

  function unixToDatetime(unixTimestamp) {
    return new Date(unixTimestamp * 1000);  
  }


  return (
    <div>
      <CanvasJSChart options={chartData}/>		
    </div>
  )
}
