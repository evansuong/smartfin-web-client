import React, { useEffect, useState } from 'react';
import '../styles/WidgetArea.css';
import HeightChart from '../widgets/HeightChart';

import PropTypes from 'prop-types';

import TemplateWidget from '../widgets/TemplateWidget';


// build a widget
function widgetTemplate(title, body, gridItem, qString) {
    return {
        titleText: title,
        bodyComponent: body,
        gridItem: gridItem,
        queryString: qString,
    }
}


// list of all widgets in their corresponding views
const Widgets = {
    ride: {
        rideWidget1: widgetTemplate('RideWidget1', TemplateWidget, 'main', ''),
        rideWidget2: widgetTemplate('RideWidget2', HeightChart, 'side', ''),
        rideWidget3: widgetTemplate('RideWidget3', TemplateWidget, 'left-square', ''),
        rideWidget4: widgetTemplate('RideWidget4', TemplateWidget, 'right-square', ''),
    },
    multiple: {
        multipleWidget1: widgetTemplate('MultipleWidget1', TemplateWidget, 'main', ''),
        multipleWidget2: widgetTemplate('MultipleWidget2', TemplateWidget, 'side', ''),
        multipleWidget3: widgetTemplate('MultipleWidget3', TemplateWidget, 'left-square', ''),
        multipleWidget4: widgetTemplate('MultipleWidget4', TemplateWidget, 'right-square', ''),
    },
    CDIP: {
        CDIPWidget1: widgetTemplate('CDIPWidget1', TemplateWidget, 'main', ''),
        CDIPWidget2: widgetTemplate('CDIPWidget2', TemplateWidget, 'side', ''),
        CDIPWidget3: widgetTemplate('CDIPWidget3', TemplateWidget, 'left-square', ''),
        CDIPWidget4: widgetTemplate('CDIPWidget4', TemplateWidget, 'right-square', ''),
    }   
}



/* WIDGET AREA COMPONENTS */
// map current view number to view type
const viewToWidgetType = {
    0: 'ride',
    1: 'multiple',
    2: 'CDIP',
}

WidgetArea.propTypes = {
    currentView: PropTypes.number,
    currentRideData: {},
}


export default function WidgetArea(props) {
    
    const { currentView, currentRideData } = props;
    const [widgetList, setWidgetList] = useState(Widgets['ride']);
    
    // set the view 
    useEffect(() => {
        let viewToRender = viewToWidgetType[currentView]
        setWidgetList(Widgets[viewToRender]);
    }, [currentView]);

    // map widgets in the current view to the widget area
    return (
        <div className="widget-grid">
            {Object.keys(widgetList).map((key, index) => {
                let widgetData = widgetList[key];
                return (
                    <Widget key={index} data={{...widgetData, currentRideData}}/>);  
            })}
       </div>
    )
}

// check proptypes
WidgetArea.propTypes = {
    currentView: PropTypes.number,
}



// widget class defines a header and body content to show data
function Widget(props) {

    const { gridItem, titleText, bodyComponent, queryString, currentRideData } = props.data
    // const { rideApiFetch } = useFetch()

    console.log(props)

    return (
        <div className={`widget ${gridItem}`}>
            <div className="widget__header">
                {titleText}
            </div>
            <div className="widget__body">
                {bodyComponent(currentRideData)}
            </div> 
        </div>
    )
}

// fill this when we figure out ride data
Widget.propTypes = {

}
