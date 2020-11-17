import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export function MapContainer (props, { rideData }) {
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [ride, setRide] = useState([]);
  const [bounds, setBounds] = useState(new props.google.maps.LatLngBounds());

  console.log(rideData)

  //get all the rides
  useEffect(() => {
    getRide();
  }, [])

  useEffect(() => {
    let bound = new props.google.maps.LatLngBounds();
    let point = {lat: ride.latitude, lng: ride.longitude}
    bound.extend(point);
    
    setBounds(bound)
    // console.log(bounds)
  }, [ride])

  //get all rides
  const getRide = async () => {
    let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/rideId=15692?format=json`);
    let item = await pog.json();    
    
    console.log(item); 
    
    setRide(item);
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
          
        <Marker
            onClick = {onMarkerClick}
            name = {ride.rideId}
            position = {{lat:ride.latitude, lng: ride.longitude}}
        />
            
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