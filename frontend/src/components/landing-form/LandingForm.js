import React, { useState } from 'react'
import LoginPanel from './LoginPanel';
import SignupPanel from './SignupPanel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/LandingForm.css'

// styling for Tabs component, documented in materialUI docs
// make the input forms keep the input field labels dark cuz making them white looks weird
const tabStyles = {
    root: {
        background: 'transparent',
        '&.PrivateTabIndicator-colorSecondary-4': 'black',
        '&.PrivateTabIndicator-colorPrimary-4': 'black',
        '&.PrivateTabIndicator-vertical-10': {
            top: 0,
            height: '10px',
        },
        color: "#000"
    }
}
const useStyles = makeStyles(tabStyles);


export default function LandingForm({ history, clicked }) {

  // whether or not the login form is showing
  const [currentForm, setCurrentForm] = useState(1); 
  const classes = useStyles(); // import tabs styles

  
  const handleSwitch = (event, newValue) => {
    setCurrentForm(newValue)
  }

  // accessibility props for tabs
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


  return (
    <div className="landing-form-container">
      {currentForm ?
      <SignupPanel history={history} />
        :
      <LoginPanel history={history} />
      }
      <Tabs
        className={`${classes.root} menu`}
        orientation="horiontal"
        onChange={handleSwitch}
        value={currentForm}
        variant="fullWidth"
        indicatorColor="primary"
        TabIndicatorProps={{
          style: {
            height: "1px",
            top: 0,
            backgroundColor: 'black',
          }
        }}
      >
        <Tab label="Login" {...a11yProps(0)}/>
        <Tab label="Signup" {...a11yProps(1)}/>
      </Tabs>
    </div>
  )
}
