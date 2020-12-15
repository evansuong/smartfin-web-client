import React, { useState, useEffect, useContext } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
import { RideContext } from '../contexts/RideContext';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const HALFWEEKSEC = 302400;
const HALFMONTHSEC = 1314000;
const HALFYEARSEC = 15770000;


export default function HeightChart() {

    const [chartOptions, setChartOptions] = useState();
    const [chartType, setChartType] = useState('single');
    const { rideState } = useContext(RideContext)
    const { startTime, endTime, rideId, location } = rideState;
    // console.log('RIDESTATE IN HEIGHTCHART 18', rideState)
   
    const domainName = 'http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/';
    const fields = 'fields=heightSmartfin,startTime'

    const queries = {
        single: `${domainName}rideId=${rideId}/${fields}`,
        locationWeek: `${domainName}startDate=${startTime - HALFWEEKSEC},endDate=${endTime + HALFWEEKSEC}/${fields}`,
        locationMonth: `${domainName}startDate=${startTime - HALFMONTHSEC},endDate=${endTime + HALFMONTHSEC}/${fields}`,
        locationYear: `${domainName}startDate=${startTime - HALFYEARSEC},endDate=${endTime + HALFYEARSEC}/${fields}`,
        location: `${domainName}location=${location}`
    }

    useEffect(() => {
        buildChartData()
    }, [chartType])
        
    
    async function buildChartData() {
        fetch(queries[chartType])
        .then(response => response.json())
        .then(data => console.log(data))
            // response.map(ride => (
            //     { 
            //         time: data.startDate,
            //         height: data.heightSmartfin
            //     }
            // ))
        
    }


    // // have a metric vs ft button
    // const metric = true;

    // const options = {
    //     axisX: {
    //         lineColor: '#CCCCCC',
    //     },
    //     axisY: {
    //         minimum: 0,
    //         lineColor: '#CCCCCC',
    //         gridColor: '#CCCCCC',
    //         tickColor: '#CCCCCC',
    //         labelFormatter: function ( e ) {
    //             return e.value + "m";  
    //         },
    //         interval: .1,
    //     },
    //     backgroundColor: '#f0f8ff',
    //     data: [{
    //         // Change type to "doughnut", "line", "splineArea", etc.
    //         type: chartType,
    //         dataPoints: chartOptions.dataPoints.map(data => (
    //             { label: data.time, y: data.height }
    //         )),
    //         lineColor: '#CCCCCC',
    //     }],
    //     dataPointMinWidth: 70,     
    //     toolTip: {
    //         content: metric ? "{y}m" : "{y}ft"
    //     }   
    // }

    return (
        <div>
            {/* {data && 
            	<CanvasJSChart options = {options}
				style={{ backgroundColor: 'red' }}/>
            } */}
            height chart
		
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}

