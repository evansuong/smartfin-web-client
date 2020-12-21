import React, { useState, useEffect, useContext } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { RideContext } from '../contexts/RideContext';

const mapStyles = {
  width: '65%',
  height: '55%',
};

export function MapContainer (props) {
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const { rideState } = useContext(RideContext)
  const { rideId, longitude, latitude } = rideState;
  console.log(rideId, longitude, latitude)
  // const [bounds, setBounds] = useState(new props.google.maps.LatLngBounds());

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
      containerStyle={mapStyles}
      initialCenter={{
        lat: latitude,
        lng: longitude
      }}
      zoom={15}
    >
      <Marker
        onClick = {onMarkerClick}
        name = {"session #" + rideId}
        position = {{ lat: latitude, lng: longitude }}
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

export function MapTest(){
  return MapContainer;
}