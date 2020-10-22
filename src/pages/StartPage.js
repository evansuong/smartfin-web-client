import React, { useState } from 'react'
import LoginPanel from '../components/LoginPanel'
import '../styles/StartPage.css'

export default function StartPage() {

    const [clicked, setClicked] = useState(false)

    const startPageStyle = clicked ? {
        title: {
            bottom: '62vh',
        },
        btn: {
            opacity: '0',
        }, 
        login: {
            opacity: '1',
            transitionDelay: '.5s',
            zIndex: 999,
        }
    } : {
        title: {
            bottom: '50vh',
            transitionDelay: '.1s',
            transitionDuration: '1s',
        },
        btn : {
            transitionDelay: '.5s',
            opacity: '1',
            zIndex: 999,
        },
        login: {
            opacity: '0',
            zIndex:-1,
        }
    }

    return (
        <div className="start-page">
            <div className="title" style={startPageStyle.title}>
                <img 
                    className="title__large" 
                    src={require("../res/title.png")}
                    alt="smartfin title"
                />
                <div className="title__subtitle">RIDE</div>
            </div>

            <div 
                className="button"
                style={startPageStyle.btn} 
                onMouseDown={() => setClicked(true)} 
                >
                    Dive In
            </div>
            <div 
                className="login-panel"
                style={startPageStyle.login}
                onMouseLeave={() => setClicked(false)}
                >
                    <LoginPanel onMouseLeave={() => setClicked(false)} clicked={clicked}></LoginPanel>
            </div>
        </div>
    )
}
