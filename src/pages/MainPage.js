import React from 'react'
import { Link } from 'react-router-dom'
import WidgetArea from '../components/WidgetArea'

export default function MainPage() {
    return (
        <h1>
            <div className="header"></div>
            <WidgetArea></WidgetArea>
        </h1>
    )
}