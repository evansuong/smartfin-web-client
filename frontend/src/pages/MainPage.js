import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ViewMenu from '../components/ViewMenu';
import WidgetArea from '../components/WidgetArea';

import Tab from '@material-ui/core/Tab';

import searchIcon from '../res/search.webp';

import '../styles/MainPage.css';


export default function MainPage() {

    // view state of widget area
    const [currentView, setCurrentView] = useState(0);
    const [currentRideData, setcurrentRideData] = useState({});

    useEffect(() => {
        setcurrentRideData({
            rideId: 'templateRide',
            location: 'San Diego',
            heightSmartfin: '100000',
        })
    }, [])
  
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
                    <div className="title__id">{currentRideData.rideId}</div>
                    <div className="title__location">{currentRideData.location}</div>
                </div>
                <Link to="/search">
                    <div className="header__search">
                        <img src={searchIcon} alt="search" width="30px" height="30px"/>
                    </div>
                </Link>
            </div>
            <div className="body">
                <ViewMenu currentView={currentView} setCurrentView={setCurrentView}>
                    <Tab label="this" {...a11yProps(0)}/>
                    <Tab label="multiple" {...a11yProps(1)}/>
                    <Tab label="CDIP" {...a11yProps(2)}/>
                </ViewMenu>
                <WidgetArea currentRideData={currentRideData} currentView={currentView}/>                   
            </div>
        </div>
    )
} 