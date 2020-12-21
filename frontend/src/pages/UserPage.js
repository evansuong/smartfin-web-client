import React from 'react'
import { Link } from 'react-router-dom'

export default function UserPage({ history }) {

    

    return (
        <div>
            <h1>
                user info page
            </h1>
            <button onClick={() => history.goBack()}>
                back
            </button>
        </div>
        
    )
}
