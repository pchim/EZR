import React, {Component} from 'react';
import Auth from './Auth';
import NavBar from './NavBar';
// use to reobtain access token
import { getHeader } from '../../utils/env';

// authorize and choose subreddits
class NavView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: props.subreddits,
    };

    this.props = props;
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ 
      subreddits: nextProps.subreddits,
      sortType: nextProps.sortType
    });
  }

  render() {
    return(
      <div>
        <Auth />
        <NavBar 
          subreddits={this.state.subreddits}
          sortType={this.props.sortType}
          updateSubreddits={this.props.updateSubreddits}
          updateSortType={this.props.updateSortType}
        />
      </div>
    );
  }
}

export default NavView;
