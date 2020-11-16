import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HeightChart({ rideData }) {

    const { heightSmartfin, heightCDIP } = rideData;

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
            type: "column",
            dataPoints: [
                { label: "Smartfin",  y: heightSmartfin  },
                { label: "CDIP", y: heightCDIP  },
            ],
            lineColor: '#CCCCCC',
        }],
        dataPointMinWidth: 70,     
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

