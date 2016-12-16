import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import env  from '../../utils/env';

const Auth = (props) => {
  const getRandomString = () => {
    Math.random().toString(36).substring(2,10);
  }

  let { URI, clientID } = env;
  let TYPE = 'code';
  let RANDOM_STRING = getRandomString();
  let DURATION = 'temporary';
  let SCOPE_STRING = 'read';
  localStorage.setItem('rs', RANDOM_STRING);
  let auth_url = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${TYPE}` 
    + `&state=${RANDOM_STRING}&redirect_uri=${URI}&duration=${DURATION}&scope=${SCOPE_STRING}`;  
  const logOut = () => {
    localStorage.removeItem('TOKEN');
    browserHistory.push('/');
  } 

  return (
    <div className="container">  
        {localStorage.getItem('TOKEN') ? (<div><button onClick={logOut}><h4>Log Out</h4></button></div>) : <div><a href={auth_url}><h2>Login and Authorize</h2></a></div> }
    </div>
  );
}

export default Auth;

