import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import logoImg from '../res/logo_img.png'
import userIcon from '../res/user_icon.png'


/**
 *  Navbar gives links to the start page and the user page
 */
export default function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">
                <img className="Navbar__logo" src={logoImg} alt="" />
            </Link>
            <Link to="/user">
                <img className="Navbar__user" src={userIcon} alt="" />
            </Link>
        </div>
    )
}
