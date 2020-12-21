import React, { useState, useContext } from 'react'
import { RideContext } from '../contexts/RideContext';
import '../styles/WidgetArea.css'

import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function HeightChart() {

    const { rideState } = useContext(RideContext)
    const { startDate, heightSmartfin } = rideState;
    const date = new Date(startDate * 1000).toString()

    // have a metric vs ft button
    const metric = true;

    const options = {
        axisX: {
            lineColor: '#CCCCCC',
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
            type: 'column',
            dataPoints: 
                [{ label: date, y: heightSmartfin }],
            
            lineColor: '#CCCCCC',
        }],
        dataPointMinWidth: 70,     
        toolTip: {
            content: metric ? "{y}m" : "{y}ft"
        }   
    }

    return (
        <div className="height-chart">
            <CanvasJSChart options = {options}/>		
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}

