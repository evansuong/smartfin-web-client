import axios from 'axios'

const RideAPI = {
  getRideById: 
    async function(rideId) {
      return axios.get(`http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/rideId=${rideId}`)
      .then(res => onSuccess(res))
      .catch(err => onError(err))
    },
  getRideByLocation: 
    async function(location) {
      return axios.get(`http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/location=${location}`)
      .then(res => onSuccess(res))
      .catch(err => onError(err))
    },
  getRideByTime:
    async function(startTime, endTime) {
      return axios.get(`http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/startDate=${startTime},endDate=${endTime}`)
      .then(res => onSuccess(res))
      .catch(err => onError(err))
    },
  getRideByTimeAndLocation:
    async function(startTime, endTime, location) {
      let locations = await this.getRideByLocation(location)
      let times = await this.getRideByTime(startTime, endTime)
      console.log(locations)
      console.log(times)
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