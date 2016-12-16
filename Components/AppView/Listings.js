import React, { Component } from 'react';
import Listing from './Listing';

// listings view
const Listings = (props) => (
      <div>
        {props.listings.map((listing, i) => <Listing key={i} num={i} listing={listing}/>)}
      </div>
    );

export default Listings;


