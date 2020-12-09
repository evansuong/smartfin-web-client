import React, { useState } from 'react';
import { useHistory, Link, withRouter } from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios'
import '../styles/LoginPanel.css';

const api = 'https://virtserver.swaggerhub.com/Anshul-Birla/SmartFin1/1.0.0/'

export default function LoginPanel({ history }) {
  const myHistory = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = () => {
    myHistory.push("/login");
    console.log(email, password);

    const data = {
      "email": email,
      "password": password
    }

    loginUser(data).then((res)=>{
      console.log("Success");
      console.log(res);
      history.push("/test")
    })


  };

  const loginUser = async (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          api +
            'users/login/',
          data
        )
        .then((res) => {
          console.log(res)
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error)
          alert("Wrong Credentials")
          reject(error);
        });
    });
  };

  return (
    <div className="login-form" >
      <form autoComplete="off">
        <br />
        <FormControl style={{width:'13%'}}>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
            fullWidth
            type="text"
            id="component-simple"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
        <br />
        <br />
        <FormControl style={{width:'13%'}}>
          <InputLabel htmlFor="component-simple">Password</InputLabel>
          <Input
            type="password"
            id="component-simple"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
      </form>
      <Button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleSubmit}>
        Login
      </Button>
      {/* <div className="login-panel__padding" style={{ margin: "20px" }}> </div> */}
    </div>
  );
}
// import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";

// import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
// import '../styles/LoginPanel.css';

// export default function LoginPanel({ history }) {
//   const myHistory = useHistory();
//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();
//   const handleSubmit = () => {
//     myHistory.push("/login");
//     console.log(username, password);

//     // make backend call here
    

//     history.push("/search")
//   };
//   return (
//     <>
//       <form autoComplete="off">
//         <br />
//         <FormControl>
//           <InputLabel htmlFor="component-simple">Username</InputLabel>
//           <Input
//             type="text"
//             id="component-simple"
//             value={username}
//             onChange={(e) => {
//               e.preventDefault();
//               setUserName(e.target.value);
//             }}
//             onSubmit={handleSubmit}
//           />
//         </FormControl>
//         <br />
//         <br />
//         <FormControl>
//           <InputLabel htmlFor="component-simple">Password</InputLabel>
//           <Input
//             type="password"
//             id="component-simple"
//             value={password}
//             onChange={(e) => {
//               e.preventDefault();
//               setPassword(e.target.value);
//             }}
//             onSubmit={handleSubmit}
//           />
//         </FormControl>
//       </form>
//       <Button style={{ marginTop: '20px' }} onClick={handleSubmit}>
//         Login
//       </Button>
//       <div className="login-panel__padding" style={{ margin: "20px" }}> </div>
//     </>
//   );
// }
