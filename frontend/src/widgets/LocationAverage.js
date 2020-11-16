import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LocationAverage({ rideData }) {

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
        },
        backgroundColor: '#f0f8ff',
        data: [{
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "January",  y: heightSmartfin  },
                { label: "February", y: heightCDIP  },
                { label: "March", y: heightCDIP  },
                { label: "April", y: heightCDIP  },
                { label: "May", y: heightCDIP  },
                { label: "June", y: heightCDIP  },
                { label: "July", y: heightCDIP  },
                { label: "August", y: heightCDIP  },
                { label: "September", y: heightCDIP  },
                { label: "October", y: heightCDIP  },
                { label: "November", y: heightCDIP  },
                { label: "December", y: heightCDIP  },
            ],
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

