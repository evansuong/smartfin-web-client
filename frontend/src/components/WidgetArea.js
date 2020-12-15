import React, { useEffect, useState, useContext } from 'react';
import '../styles/WidgetArea.css';


import PropTypes from 'prop-types';

import TemplateWidget from '../widgets/TemplateWidget';
import HeightChart from '../widgets/HeightChart';
import SessionInfo from '../widgets/SessionInfo';
import LocationAverage from '../widgets/LocationAverage';

import Mappo from './MapRide';
import { RideContext } from '../contexts/RideContext';


/*
 * this function simply formats a widget into a object
 */
function widgetTemplate(title, body, gridItem, qString) {
    return {
        titleText: title,
        bodyComponent: body,
        gridItem: gridItem,
        queryString: qString,
    }
}

// the data declared here is the same as ^^^
const Widgets = {
    ride: {
        rideWidget1: {
            titleText: 'RideWidget1', 
            bodyComponent: <HeightChart/>, 
            gridItem: 'main',
            queryString: '',
        },
        rideWidget2: {
            titleText: 'Wave Height', 
            bodyComponent: <HeightChart/>, 
            gridItem: 'side',
            queryString: ''
        },
        rideWidget3: {
            titleText: 'Ocean Temperature', 
            bodyComponent: <SessionInfo/>, 
            gridItem: 'left-square',
            queryString: ''
        },
        rideWidget4: {
            titleText: 'On Location', 
            bodyComponent: <HeightChart/>, 
            gridItem: 'right-square',
            queryString: '',
        },
    },
    multiple: {
        // these declarations are the same as above i just got lazy
        multipleWidget1: widgetTemplate('MultipleWidget1', LocationAverage, 'main', ''),
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

// map current view number prop to view type
const viewToWidgetType = { 
    0: 'ride',
    1: 'multiple',
    2: 'CDIP',
}


export default function WidgetArea({ currentView }) {
    
    const [widgetList, setWidgetList] = useState(Widgets['ride']);
    const { rideState } = useContext(RideContext)
    let first = true;

    // console.log('RIDESTATE IN WIDGETAREA 90', rideState)
    
    // set the view on view change
    useEffect(() => {
        let viewToRender = viewToWidgetType[currentView];
        setWidgetList(Widgets[viewToRender]);
    }, [currentView]);

    // map widgets in the current view to the widget area
    return (
        rideState && 
        <>
        {/* {<Mappo />} */}
        <div className="widget-grid">
            
            {/* map all the widgets in widgetList to the area */}
            {Object.keys(widgetList).map((key, index) => {
                let widgetData = widgetList[key];
                // console.log("WIDGETMAP 109", widgetData)

                if(first){
                    first = false;
                    return ( <Mappo rideDate={rideState}/> )
                }

                return <Widget key={index} {...widgetData}/>
            })}
            
       </div>
       
       </>
    )
}

// check proptypes
WidgetArea.propTypes = {
    currentView: PropTypes.number,
    currentRideData: PropTypes.object,
}

// widget class defines a header and body content to show data
function Widget({ titleText, gridItem, bodyComponent, queryString  }) {

    // const { rideApiFetch } = useFetch()
    // console.log(key)4
    const { rideState } = useContext(RideContext)
    // console.log("RIDESTATE IN WIDGETAREA WIDGET 137", rideState)
    // console.log("WIDGET PROPS 136", titleText, gridItem)

    return (
        <div className={`widget ${gridItem}`}>
            <div className="widget__header">
                {titleText}
            </div>
            <div className="widget__body">
                {bodyComponent}
            </div> 
        </div>
    )
}

// check proptypes
Widget.propTypes = {
    titleText: PropTypes.string,
    gridItem: PropTypes.string,
    queryString: PropTypes.string,
    bodyComponent: PropTypes.func,
    rideData: PropTypes.object,
}
