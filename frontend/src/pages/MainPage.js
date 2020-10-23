import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ViewMenu from '../components/ViewMenu'
import WidgetArea from '../components/WidgetArea'

import Tab from '@material-ui/core/Tab';

import '../styles/MainPage.css'


export default function MainPage() {

    // view state of widget area
    const [viewState, setViewState] = useState(0);
  
    // accessibility props for tabs
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <div className="main-page">
            <div className="header">
                <div className="header__title">
                    <div className="title__id">ride id</div>
                    <div className="title__location">ride location</div>
                </div>
                <Link to="/search">
                    <div className="header__search">search</div>
                </Link>
            </div>
            <div className="body">
                <ViewMenu viewState={viewState} setViewState={setViewState}>
                    <Tab label="this" {...a11yProps(0)}/>
                    <Tab label="multiple" {...a11yProps(1)}/>
                    <Tab label="CDIP" {...a11yProps(2)}/>
                </ViewMenu>
                <WidgetArea viewState={viewState}/>                   
            </div>
        </div>
    )
} 