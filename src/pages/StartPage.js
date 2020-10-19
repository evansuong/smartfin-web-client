import React, { useState } from 'react'
import LoginPanel from '../components/LoginPanel'
import '../styles/StartPage.css'

export default function StartPage() {

    const [clicked, setClicked] = useState(false)

    const startPageStyle = clicked ? {
        title: {
            bottom: '560px',
        },
        btn: {
            opacity: '0',
        }, 
        login: {
            opacity: '1',
            transitionDelay: '.5s',
        }
    } : {
        title: {
            bottom: '400px',
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
        }
    }

    return (
        <div className="start-page">
            <div className="title" style={startPageStyle.title}>
                <img className="title__large" src={require("../res/title.png")}/>
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
