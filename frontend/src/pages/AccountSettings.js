import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AccountSettings.css';


import InfoCard from '../components/AccountInfo'
import ResetPassword from  '../components/ResetPassword'
import UserRides from '../components/UserRides'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const currentUser = {
    fname: "John",
    lname: "Bob",
    email: "bobjohn@gmail.com",
    password: "abcdef",
    rides : [
        100,
        200,
        300,
        150,
        250,
        350,
        400,
        450,
        500
    ]
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
root: {
    backgroundColor: theme.palette.background.paper,
    // width: 2000,
},
}));



// start page will get data from search page
export default function AccountSettings({ history, location }) {
    //tabpanel stuff
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [currentUser, setCurrentUser] = useState();
    const [name, setName] = useState('');

    useEffect(()=>{
        setCurrentUser(location.state.user)
    },[location.state])

    //test
    useEffect(()=>{
        if(currentUser){
            setName(currentUser.name)
        }
        console.log(currentUser)
    },[currentUser])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }


    return (
        <div className="account-page">

            {/* header displays ride name, location, and search button */}
            <div className="header">
                <div className="header__title">
                    <div className="title">Welcome, {name}</div>
                </div>
            </div>

            <div className={classes.root}>
                <AppBar position="relative" color="default" m="auto">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        // variant="fullWidth"
                        centered
                    >
                    <Tab label="Account" {...a11yProps(0)} />
                    <Tab label="Password" {...a11yProps(1)} />
                    <Tab label="Rides" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <InfoCard user={currentUser} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ResetPassword user={currentUser} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        {/* <UserRides user={currentUser} /> */}
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    )
} 