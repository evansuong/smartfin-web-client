import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginPanel from '../components/LoginPanel'
import '../styles/StartPage.css'

export default function StartPage() {

    const [clicked, setClicked] = useState(false)

    const startPageStyle = clicked ? {
        title: {
            top: '100px',
        },
        btn: {
            opacity: '0',
        }, 
        login: {
            transitionDelay: '.5s',
            opacity: '1',
        }
    } : {
        title: {
            top: '200px',
            transitionDelay: '.5s',
        },
        btn : {
            transitionDelay: '.5s',
            opacity: '1',
            zIndex: 999,
        },
        login: {
            opacity: '0',
        }
    }

    return (
        <div className="start-page">
            <div className="start-page__title" style={startPageStyle.title}>
                <img className="title__large" src={require("../res/title.png")}/>
                <div className="title__subtitle">RIDE</div>
            </div>

        
            <div 
                className="start-page__btn"
                style={startPageStyle.btn} 
                onMouseDown={() => setClicked(true)} >
                    Dive In
            </div>
            <div 
                className="start-page__login"
                style={startPageStyle.login}
                onMouseLeave={() => setClicked(false)}>
                    <LoginPanel onMouseLeave={() => setClicked(false)} clicked={clicked}></LoginPanel>
            </div>
        </div>
    )
}
