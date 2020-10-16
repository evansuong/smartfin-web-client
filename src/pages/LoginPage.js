import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <div>
            <h1>this is the log in page</h1>
            <Link to="/main">
                <h1>log in</h1>
            </Link>
        </div>
    )
}
