import React, { useEffect, useState} from 'react';
import RandomRide from './RandomRide';
// import '../styles/RandomRide.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "transparent"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



function RandomRides(props){
    const [rides, setRides] = useState([]);

    const classes = useStyles();
    
    // get random rides on load
    useEffect(() => {
        get5RandomRides();
    }, []);

    //get 5 random rides
    const get5RandomRides = async () => {
        let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides?format=json`);
        let item = await pog.json();
        console.log(item);
        setRides(item);
    };

    return(
        <div className="column">

            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Sample Rides
                    </Typography>
                    <Typography variant="body2" component="p">
                    {rides.slice(0,5).map((ride)=>{
                        return(
                            <RandomRide ride={ride}/>
                        )
                    })}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Refresh</Button>
                </CardActions>
            </Card>
            <br></br>
        </div>
    );

}

export default RandomRides;
