import React, { useState, useEffect } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LocationAverage({ rideData }) {

    const { loc1, heightSmartfin, heightCDIP } = rideData;
    const [chartData, setChartData] = useState({}) 
 
    // have a metric vs ft button
    const metric = true;

    async function getData(url) {
        console.log('fetching data')
        let pog;
        let item;   
        pog = await fetch(url); //update to get two dates, start and beginning
        item = await pog.json();    
        return item
    }

    useEffect(async() => {
        let data = await getData(`https://lit-sands-95859.herokuapp.com/ride/rides/location=${loc1}/fields=heightSmartfin,startTime?format=json`)
        data = data['data'].sort(compareTime)
        setChartData(data)
    }, [loc1])

    // TODO: split user and sceintist data views into multiple pages
    const options = {
        axisX: {
            lineColor: '#CCCCCC',
            interval: 1000,
        },
        axisY: {
            minimum: 0,
            lineColor: '#CCCCCC',
        },
        backgroundColor: '#f0f8ff',
        data: [{
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "line",
            dataPoints: Array.from(chartData, (session) => (
                { label: session.startTime, y: session.heightSmartfin }
            )),
            lineColor: '#CCCCCC',
        }],
        dataPointMinWidth: 30,     
        toolTip: {
            content: metric ? "{y}m" : "{y}ft"
        }   
    }

    return (
        <div>
			<CanvasJSChart options = {options}
				style={{ backgroundColor: 'red' }} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}

function compareTime(a, b) {
    if ( a.startTime < b.startTime ){
        return -1;
    }
    if ( a.startTime > b.startTime ){
        return 1;
    } else {
        return 0;
    }
}
