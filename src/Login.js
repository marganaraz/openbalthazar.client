import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Config } from './Config';

const clientId = Config.GoogleAPIKey;

const success = (response) => {
    
    const userObject = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password: 'test'
    }

    localStorage.setItem("user", JSON.stringify(userObject));
    window.location.href = '/menu';
}

const error = response => {
  console.error(response) // eslint-disable-line
}

export default () => (
  <div>
    <GoogleLogin theme="dark" onSuccess={success} onFailure={error} clientId={clientId} />
  </div>
)