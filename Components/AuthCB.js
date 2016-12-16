import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import env from '../utils/env';

// authorize callback, get access token, and redirect
const AuthCB = (props) => {
  if (localStorage.getItem('TOKEN')) {
    browserHistory.push('/');
  }

  let CODE = props.location.query.code;
  let STATE = props.location.query.state;
  let {URI, clientID, clientSecret} = env;
  let authString = btoa(clientID + ':' + clientSecret);
  let options = { method: 'POST',
                  headers: {
                    'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    'authorization' : `basic ${authString}`
                  },
                  url: 'https://www.reddit.com/api/v1/access_token',
                  body: `grant_type=authorization_code&code=${CODE}&redirect_uri=${URI}` 
                };
  fetch('https://www.reddit.com/api/v1/access_token', options)
    .then(response => response.json())
    .then(response => {
      let TOKEN = response.access_token;
      if (STATE === localStorage.getItem('rs')) {
        // Add in every request header: authorization: bearer TOKEN
        localStorage.setItem('TOKEN', TOKEN);
        localStorage.removeItem('rs');        
        browserHistory.push('/');
      } else {
        browserHistory.push('/');
      }
    });

  return (
    <div></div>
  )
}

export default AuthCB;

