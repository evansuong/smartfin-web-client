import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserPage.css';

// start page will get data from search page
export default function UserPage({ history, location }) {



    return (
        <div className="user-page">

            {/* header displays ride name, location, and search button */}
            <div className="header">
                <div className="header__title">
                    <div className="title">Login</div>
                </div>
            </div>

            <div className="login">

            </div>

        </div>
    )
} 