

const RideAPI = {
  getRideById: 
  function(rideId) {
    console.log(rideId)
  },
  getRideByLocation: 
  function(location) {
    console.log(location)
  },
  getRideByTime:
  function(startTime, endTime) {
    console.log(startTime, endTime)
  },
  getRideByTimeAndLocation:
  function(startTime, endTime, location) {
    this.getRideByLocation(location)
    this.getRideByTime(startTime, endTime)
  }
}


function onSuccess(response) {
  return {
    status: true,
    data: response.data,
  }
}

function onError(err) {
  return {
    status: false,
    data: err.response.data.msg,
  }
}


export default RideAPI;