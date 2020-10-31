import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ViewMenu from '../components/ViewMenu';
import WidgetArea from '../components/WidgetArea';

import Tab from '@material-ui/core/Tab';

import searchIcon from '../res/search.webp';

import '../styles/MainPage.css';

// start page will get data from search page
export default function MainPage() {

    // view state of widget area
    const [currentView, setCurrentView] = useState(0);
    const [currentRideData, setcurrentRideData] = useState({});

    // set the current ride data to default values for testing 
    // (TODO: REPLACE WITH REAL DATA)
    useEffect(() => {
        setcurrentRideData({
            rideId: 'templateRide',
            location: 'San Diego',
            heightSmartfin: '100000',
        })
    }, [])
  
    return (
        <div className="main-page">

            {/* header displays ride name, location, and search button */}
            <div className="header">
                <div className="header__title">
                    <div className="title__id">{currentRideData.rideId}</div>
                    <div className="title__location">{currentRideData.location}</div>
                </div>

                {/* search button routes to search page */}
                <Link to="/search">
                    <div className="header__search">
                        <img src={searchIcon} alt="search" width="30px" height="30px"/>
                    </div>
                </Link>
            </div>

            {/* widget area and view menu */}
            <div className="body">
                <ViewMenu currentView={currentView} setCurrentView={setCurrentView} />
                <WidgetArea currentRideData={currentRideData} currentView={currentView}/>                   
            </div>
        </div>
    )
} 