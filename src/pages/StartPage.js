import React, { useState, useEffect } from 'react'
import LoginPanel from '../components/LoginPanel'
import '../styles/StartPage.css'
import title from '../res/title.png'


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
        <div>
            <div className="start-page__action-panel">
                <div className="action-panel__title" style={startPageStyle.title}>
                    <img 
                        className="title__large" 
                        src={title}
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
            </div>'
         
            <div className="start-page__info-panel">
                <div className="info-panel__description">
                    <p>The Smartfin Project aims to unite the surfing community and the research community in an effort to fill this gap in our oceanographic data. It began years ago with the collaborative vision of Scientists and Researchers working with the Scripps Institute of Oceanography, who hoped to innovate a new way to model the behaviour of our oceans.</p>
                </div>
                <div className="info-panel__video">
                    <iframe className="video"
                        title="REU Video"
                        src="https://www.youtube.com/embed/rY145HV-ReM" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" 
                    />
                </div>
            </div>
        </div>
    )
}
