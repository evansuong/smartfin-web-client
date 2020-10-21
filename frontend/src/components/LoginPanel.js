import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/LoginPanel.css'

export default function LoginPanel() {

    return (
        <div>
            <Link to="/main">
                <p style={{color: 'black'}}>
                    log in
                    </p>
            </Link>
        </div>
    )
}
