import React, { useState } from 'react'
import LoginPanel from '../components/LoginPanel'
import '../styles/StartPage.css'
import title from '../res/title.png'


/**
 * StartPage is where the user is routed to when they first enter the webpage
 *           here the user can log in and view information about our project
 * 
 * props: 
 *      history: default prop passed by router that sends the user to a new page when
 *               a path is pushed to it
 */
export default function StartPage({ history }) {

    const [clicked, setClicked] = useState(false)

    // add some funky animations to display the login panel
    const startPageStyle = clicked ? { // when the dive in button is clicked
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
    } : { // when the user drags their mouse away from the login panel
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

                {/* title */}
                <div className="action-panel__title" style={startPageStyle.title}>
                    <img 
                        className="title__large" 
                        src={title}
                        alt="smartfin title"
                    />
                    <div className="title__subtitle">RIDE</div>
                </div>

                {/* dive in button */}
                <div 
                    className="button"
                    style={startPageStyle.btn} 
                    onMouseDown={() => setClicked(true)} 
                >
                        Dive In
                </div>

                {/* login panel (hidden by default) */}
                <div 
                    className="login-panel"
                    style={startPageStyle.login}
                    onMouseLeave={() => setClicked(false)}
                >
                    <LoginPanel history={history} onMouseLeave={() => setClicked(false)} clicked={clicked}></LoginPanel>
                </div>
            </div>
         
            {/* video section */}
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