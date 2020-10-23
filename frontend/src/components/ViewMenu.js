import React, { useEffect, useState} from 'react'
import '../styles/ViewMenu.css'
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles' 

// styling for Tabs component
const tabStyles = {
    root: {
        background: '#052848ff',
        flexGrow: 1,
    }
}
const useStyles = makeStyles(tabStyles);


// view menu component
export default function ViewMenu(props) {

    const { viewState, setViewState } = props;
    const [matches, setMatches] = useState(window.matchMedia('(max-width: 768px)').matches);
    const classes = useStyles(); // import tabs styles

    console.log(window.matchMedia('(max-width: 768px)').matches)

    function handler(e) {
        console.log(e.matches)
        setMatches(e.matches);
    }

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").addListener(handler)
    }, [])

    // updates the view state in mainpage.js
    function handleChange(event, newValue) {
        setViewState(newValue)
    }

    // props.children returns all the tabs declared in mainpage.js
    return (
        <div className="view-menu">
            <Tabs
                className={`${classes.root} menu`}
                orientation={matches ? "horizontal" : "vertical"}
                onChange={handleChange}
                value={viewState}
                variant="fullWidth"
            >
                {props.children}
            </Tabs>
        </div>
    )
}
