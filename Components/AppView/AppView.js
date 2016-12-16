import React, {Component} from 'react';
import Listings from './Listings';
import env from '../../utils/env';
import { browserHistory } from 'react-router';

class AppView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: props.subreddits,
      frontAnchor: '',
      position: -1,
      sortType: props.sortType,
      listings: [],
      message: 'MORE...'
    };
    this.props = props;
    this.checkBottom = this.checkBottom.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ 
      subreddits: nextProps.subreddits,
      sortType: nextProps.sortType
     });
    this.setState({ listings: [] });
    this.setState({ position: -1 });
    if (nextProps.subreddits.length === 0) {
      this.addMoreListings([]);
    } else {
      this.addMoreListings(this.props.subreddits);
    
    }
  }

  // infinite scroll
  checkBottom(event) {
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.addMoreListings(this.state.subreddits);
    }
  }

  addMoreListings(subs) {
    let position = this.state.position;
    if (subs.length) {
      position += 1;
      position %= subs.length;
      this.setState({ position });
    }
    this.fetchListings(position, subs);      
  }

  fetchListings(position, subs) {
    let { name, anchor } = position > -1 ? subs[position] : { name: '', anchor: `${this.state.frontAnchor}` };
    let subreddit = name ? `/r/${name}` : '';
    let after = anchor ? `/?after=${anchor}` : '';
    let sort = `/${this.state.sortType}`;
    fetch(`https://oauth.reddit.com${subreddit}${sort}${after}`, {headers: env.getHeader()})
    .then(res => res.json())
    .then(res => {
      if (res.error === 401) {
        if (localStorage.getItem('TOKEN')) {
          localStorage.removeItem('TOKEN');
          browserHistory.push('/');
        }
      } else {
        this.updateListings(res);
      }
    });
  }

  updateListings(response) {
    let listings = response.data.children;
    if (listings.length) {
      this.setAfterName(listings[listings.length - 1]);
      this.setState({ listings: this.state.listings.concat(listings) });
      this.setState({ message: 'MORE...' });
    } else {
      this.setState({ message: `END OF SUB: ${this.state.subreddits[this.state.position].name.toUpperCase()}`});
      this.addMoreListings(this.state.subreddits);
    }

  }

  // set anchor of subreddit's "pages"
  setAfterName(listing) {
    let afterName = 't3_' + listing.data.id;
    if (this.state.position > -1) {
      let subreddits = this.state.subreddits.slice();
      subreddits[this.state.position].anchor = afterName;
      this.setState({ subreddits });
    } else {
      this.setState({ frontAnchor: afterName });
    }
  }

  render() {
    if (!localStorage.getItem('TOKEN')) return (<div className="container"><h2>Please Sign In</h2></div>);
    return (
      <div onScroll={this.checkBottom} className="container listings">  
        <Listings listings={this.state.listings}/>
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default AppView;