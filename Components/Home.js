import React, {Component} from 'react';
import AppView from './AppView/AppView';
import NavView from './NavView/NavView';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: [],
      sortType: 'hot'
    }
    this.updateSubreddits = this.updateSubreddits.bind(this);
    this.updateSortType = this.updateSortType.bind(this);
  }

  componentDidMount() {
    this.updateSubreddits([]);
  }

  updateSubreddits(subreddits) {
    this.setState({ subreddits });
  }

  updateSortType(sortType) {
    this.setState({ sortType });
  }

  render() {
    return (
      <div className="container">  
        <NavView 
          subreddits={this.state.subreddits} 
          sortType={this.state.sortType}
          updateSubreddits={this.updateSubreddits}
          updateSortType={this.updateSortType} />
        <AppView 
          subreddits={this.state.subreddits.map(subreddit => ({name: subreddit, anchor: ''}))} 
          sortType={this.state.sortType} 
        />
      </div>
    );
  }
}

export default Home;