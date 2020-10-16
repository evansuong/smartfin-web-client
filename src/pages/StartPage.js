import React from 'react'
import { Link } from 'react-router-dom'

export default function StartPage() {
    return (
        <div>
            <h1>this is the start page</h1>
             <Link to="/login">
                <h1>to login page</h1>
            </Link>
        </div>
    )
}
