import React from 'react'
import { Link } from 'react-router-dom'

export default function UserPage() {
    return (
        <h1>
            user info page
            <Link to="/main">
                back
            </Link>
        </h1>
    )
}
