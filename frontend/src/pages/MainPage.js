import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import ViewMenu from '../components/ViewMenu';
import WidgetArea from '../components/WidgetArea';
import { RideContext } from '../contexts/RideContext';

import searchIcon from '../res/search.webp';

import '../styles/MainPage.css';

// start page will get data from search page
export default function MainPage({ history, location }) {

	// view state of widget area
	const [currentView, setCurrentView] = useState(0);
	const [currentRideData, setCurrentRideData] = useState({});
	const { rideState } = useContext(RideContext);
	console.log("RIDESTATE IN MAINPAGE 19",rideState)

	// when location changes, update current ride data with new rid

	return (
		<div className="main-page">
			{/* header displays ride name, location, and search button */}
			<div className="main-page__header">
				<div className="header__title">
					<div className="title__id">{rideState.rideId}</div>
					<div className="title__location">{rideState.loc1}, {rideState.loc3}</div>
				</div>

				{/* search button routes to search page */}
				<Link to="/search">
					<div className="header__search">
						<img src={searchIcon} alt="search" width="30px" height="30px"/>
					</div>
				</Link>
			</div>

			{/* widget area and view menu */}
			<div className="main-page__body">
				<ViewMenu currentView={currentView} setCurrentView={setCurrentView} />
				<WidgetArea currentRideData={rideState} currentView={currentView}/>                   
			</div>
		</div>
	)
} 