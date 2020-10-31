import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import PropTypes from 'prop-types';

import '../styles/ViewMenu.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

// styling for Tabs component, documented in materialUI docs
const tabStyles = {
    root: {
        background: '#052848ff',
        '&.PrivateTabIndicator-colorSecondary-4': 'white',
        '&.PrivateTabIndicator-vertical-10': {
            width: '100%',
        }
    }
}
const useStyles = makeStyles(tabStyles);

/**
 * ViewMenu dictates the type of widgets that are being rendered to the screen
 * props: 
 *      children: the individual tab components passed that were set in MainPage.js
 *      currentView: the current data view
 *      setCurrentView: function that allows view menu to change the current view
 */
export default function ViewMenu({ currentView, setCurrentView }) {

    const { appState } = useContext(AppContext);
    const { isDesktopView } = appState;
    const classes = useStyles(); // import tabs styles

    // updates the view state in mainpage.js
    function handleChange(event, newValue) {
        setCurrentView(newValue); // newValue is the index of the tab that is selected
    }

    // accessibility props for tabs
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }


    // props.children returns all the tabs declared in mainpage.js
    return (
        <div className="view-menu">
            <Tabs
                className={`${classes.root} menu`}
                orientation={isDesktopView ? "horizontal" : "vertical"}
                onChange={handleChange}
                value={currentView}
                variant="fullWidth"
                indicatorColor="primary"
                TabIndicatorProps={{
                    style: isDesktopView ? { height: '100%' } : { width: '100%' } 
                }}
                disableTouchRipple
            >
                <Tab label="this" {...a11yProps(0)}/>
                <Tab label="multiple" {...a11yProps(1)}/>
                <Tab label="CDIP" {...a11yProps(2)}/>
            </Tabs>
        </div>
    )
}

// check data types of props
ViewMenu.propTypes = {
    currentView: PropTypes.number,
    setCurrentView: PropTypes.func,
}


