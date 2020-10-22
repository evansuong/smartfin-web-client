import React, { useEffect, useState } from 'react'
import '../styles/WidgetArea.css'
import widgets from './WidgetDefs'

const views = {
    0: 'ride',
    1: 'multiple',
    2: 'CDIP',
}


export default function WidgetArea(props) {
    
    const { viewState } = props;
    const [widgetList, setWidgetList] = useState({})
    
    useEffect(() => {
        setWidgetList(widgets[views[viewState]])
    }, [viewState])

    return (
        <div className="widget-area">
            {
                Object.keys(widgetList).map((key, index) => (
                    <div>{widgetList[key]['title']}</div>
                ))
            }
        </div>
    )
}
