import React, { useEffect, useState } from 'react'
import '../styles/WidgetArea.css'
import widgets from './WidgetDefs'

// map current view number to view type
const views = {
    0: 'ride',
    1: 'multiple',
    2: 'CDIP',
}

export default function WidgetArea(props) {
    
    const { currentView } = props;

    const [widgetList, setWidgetList] = useState({});
    
    // set the view 
    useEffect(() => {
        setWidgetList(widgets[views[currentView]]);
    }, [currentView]);

    // map widgets in the current view to the widget area
    return (
        <div className="widget-grid">
            {Object.keys(widgetList).map((key, index) => {
                let widget = widgetList[key];
                let {titleText, bodyContent, gridItem} = widget;
                return (<Widget 
                            key={index} 
                            gridItem={gridItem} 
                            titleText={titleText} 
                            bodyContent={bodyContent} 
                        />);  
            })}
       </div>
    )
}

// widget class defines a header and body content to show data
function Widget(props) {

    const { gridItem, titleText, bodyContent } = props

    return (
        <div className={`widget ${gridItem}`}>
            <div className="widget__header">
                {titleText}
            </div>
            <div className="widget__body">
                {bodyContent}
            </div> 
        </div>
    )
}
 