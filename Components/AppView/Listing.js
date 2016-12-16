import React, { Component } from 'react';

// a single listing view
const Listing = (props) => {
  let item = props.listing.data;
  let thumbnail = item.thumbnail;

  // check thumbnail source (if applicable)
  if (item.thumbnail.substring(0, 7) !== 'http://') {
    thumbnail = "../../assets/img/placeholder.png";
  }

  return (
    <div className="media">
        <div className="media-left media-middle">
            <a href={thumbnail} target="_blank">
            <img 
              className="media-object img-thumbnail" 
              src={thumbnail} 
            />
            </a>
        </div> 
        <div className="media-body">
            <a href={`https://www.reddit.com/${item.permalink}`} target="_blank">
              <h4 className="media-heading">{item.title}</h4>
            </a>
        <h5>sub: {item.subreddit}</h5>
        <p>author: <a href={`https://reddit.com/user/${item.author}`} target="blank_">{item.author}</a></p>
        </div>
        <div className="media-right">
            <h4>{props.num}</h4>
        </div>         
    </div>
  );
}

export default Listing;