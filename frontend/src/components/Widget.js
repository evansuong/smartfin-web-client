import React from 'react'

export default function Widget(props) {

    const { viewType } = props

    return (
        <div>
            {viewType}
        </div>
    )
}
