import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export function MapContainer (props) {
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [rides, setRides] = useState([]);
  const [bounds, setBounds] = useState(new props.google.maps.LatLngBounds());

  //get all the rides
  useEffect(() => {
    getRides();
  }, [])

  useEffect(() => {
    let bound = new props.google.maps.LatLngBounds();
    rides.forEach((ride) =>{
      let point = {lat: ride.latitude, lng: ride.longitude}
      // console.log(point);
      bound.extend(point);
    })
    setBounds(bound)
    console.log(bounds)
  }, [rides])

  //get all rides
  const getRides = async () => {
    // TODO: change API link when it is full
    let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides`);
    let item = await pog.json();    
    
    console.log(item);  
    setRides(item);
  }

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props)
    setActiveMarker(marker);
    setShowInfo(true);
  };

  const onClose = props => {
    if (showInfo){
      setShowInfo(false);
      setActiveMarker(null);
    }
  };

  return(
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={
            {
              lat: 32.859929, 
              lng: -117.26
            }
          }
          bounds = {bounds}
        >
          {rides.map((ride) => {
            return(
              <Marker
              onClick = {onMarkerClick}
              name = {ride.rideId}
              position = {{lat:ride.latitude, lng: ride.longitude}}
            />
            )
          })}
          <InfoWindow
            marker = {activeMarker}
            visible = {showInfo}
            onClose = {onClose}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
          </InfoWindow>

        </Map>
      );
}
 

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuAlM6spWnrliGyJYVrTyjOWh4ZGj4PrQ'
})(MapContainer);