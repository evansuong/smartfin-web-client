import axios from "axios"

const UserAPI = {
  registerUser:
  async function(firstname, lastname, email, password, passwordCheck) {
    const displayName = firstname + " " + lastname
    const signupData = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      displayName: displayName,
    }
    return axios.post('http://localhost:9000/users/register', signupData)
    .then(res => onSuccess(res))
    .catch(err => onError(err))
  },
  loginUser:
  async function(email, password) {
    const loginData = {
     email: email,
     password: password ,
    }
    return axios.post('http://localhost:9000/users/login', loginData)
    .then(res => onSuccess(res))
    .catch(err => onError(err))
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

export default UserAPI;