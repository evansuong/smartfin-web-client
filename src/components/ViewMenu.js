import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import PropTypes from 'prop-types';

import '../styles/ViewMenu.css';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

// styling for Tabs component
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

// view menu component
export default function ViewMenu(props) {

    const { appState } = useContext(AppContext);
    const { isDesktopView } = appState;
    const { currentView, setCurrentView } = props;
    const classes = useStyles(); // import tabs styles

    // updates the view state in mainpage.js
    function handleChange(event, newValue) {
        setCurrentView(newValue);
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
                {props.children}
            </Tabs>
        </div>
    )
}

// check data types of props
ViewMenu.propTypes = {
    currentView: PropTypes.number,
    setCurrentView: PropTypes.func,
}


