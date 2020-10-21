import React from 'react'
import { Link } from 'react-router-dom'
import ViewMenu from '../components/ViewMenu'
import WidgetArea from '../components/WidgetArea'

import '../styles/MainPage.css'

export default function MainPage() {
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
                <ViewMenu/>
                <WidgetArea/>
            </div>
        </div>
    )
} 