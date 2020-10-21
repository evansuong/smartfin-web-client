import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

export default function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">
                <img className="Navbar__logo" src={require("../res/logo_img.png")} alt="" />
            </Link>
            <Link to="/user">
                <img className="Navbar__user" src={require("../res/user_icon.png")} alt="" />
            </Link>
        </div>
    )
}
