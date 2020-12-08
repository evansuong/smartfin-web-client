import React, { useState } from 'react'
import '../styles/StartPage.css'
import title from '../res/title.png'
import LandingForm from '../components/landing-form/LandingForm'


const projectMessage = 
"The Smartfin Project aims to unite the surfing community and the research community \
in an effort to fill this gap in our oceanographic data. It began years ago with the \
collaborative vision of Scientists and Researchers working with the Scripps Institute \
of Oceanography, who hoped to innovate a new way to model the behaviour of our oceans."

/**
 * StartPage is where the user is routed to when they first enter the webpage
 *           here the user can log in and view information about our project
 * 
 * props: 
 *      history: default prop passed by router that sends the user to a new page when
 *               a path is pushed to it
 */
export default function StartPage({ history }) {

    const [clicked, setClicked] = useState(false) // check if user clicked outside of the login panel to close it
    const [outside, setOutside] = useState(true) // check if user mouse is outide of login panel to allow close
 
    // add some funky animations to display the login panel
    const startPageStyle = clicked ? { // when the dive in button is clicked
        title: {
            bottom: '62vh',
        },
        btn: {
            opacity: '0',
            padding: '200px 400px',
            borderRadius: '10000px',
            top: '300px'
        }, 
        form: {
            opacity: '1',
            transitionDelay: '.4s',
            zIndex: 999,
        }
    } : { // when the user drags their mouse away from the login panel
        title: { 
            bottom: '50vh',
            transitionDelay: '.1s',
            transitionDuration: '1s',
        },
        btn : {
            opacity: '1',
            zIndex: 999,
        },
        form: {
            opacity: '0',
            zIndex:-1,
        }
    }

    return (
        <div>
            <div className="start-page__action-panel" onMouseDown={() => clicked && outside && setClicked(false)}>

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
                    onMouseDown={() => {
                        setOutside(false)
                        setClicked(true)
                    }} 
                >
                        Dive In
                </div>

                {/* login panel (hidden by default) */}
                <div onMouseLeave={() => setOutside(true)} className="landing-form" style={startPageStyle.form}>
                    <LandingForm history={history}></LandingForm>
                </div>
            </div>
        </div>
    )
}