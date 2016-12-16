import React, {Component} from 'react';
import NavBarSort from './NavBarSort';
// use to reobtain access token
import env from '../../utils/env';

// choose and filter subreddits
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: props.subreddits,
      nextSubreddit: '',
      selected: '',
      message: ''
    };

    this.props = props;
    this.updateNextSubreddit = this.updateNextSubreddit.bind(this);
    this.updateSelectedSubreddit = this.updateSelectedSubreddit.bind(this);
    this.addSubreddit = this.addSubreddit.bind(this);
    this.deleteSubreddit = this.deleteSubreddit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ 
      subreddits: nextProps.subreddits, 
      propType: nextProps.propType
    });

  }

  // add subreddit to list of subreddits to view
  addSubreddit() {
    let subreddit = this.state.nextSubreddit;
    let index = this.props.subreddits.map(sub => sub.toLowerCase()).indexOf(subreddit.toLowerCase());
    if (index > -1) {
      this.setState({ nextSubreddit: ''});
      this.setState({ message: 'DUPLICATE SUBREDDIT' });
    } else {
      if (!this.state.selected) this.setState({ selected: subreddit });
      let subreddits = this.props.subreddits.concat(subreddit);

      // check if subreddit is not bank and if it returns actual listings
      if (subreddit) {
        fetch(`https://oauth.reddit.com/r/${subreddit}/?limit=2`, {headers: env.getHeader()})
        .then(res => res.json())
        .then(res => {
          if (res.error === 401) {
            if (localStorage.getItem('TOKEN')) localStorage.removeItem('TOKEN');
            this.setState({ nextSubreddit: '' });
            this.setState({ message: 'PLEASE SIGN IN' });
          } else {
            if (res.data.children.length === 0) {
              throw new Error();
            } else {
              this.updateSubreddits(subreddits);
              this.setState({ nextSubreddit: '' });
              this.setState({ message: '' });
            }
          }

        }).catch((error) => {
          console.log(error);
          this.setState({ nextSubreddit: ''});
          this.setState({ message: 'INVALID SUBREDDIT'});
        });
      }
    }
  }

  // remove the selected subreddit
  deleteSubreddit() {
    let subreddits = this.state.subreddits.slice();
    let selected = this.state.selected;
    let index = subreddits.indexOf(selected);

    const update = () => {
      if (subreddits.length) {
        this.setState({ selected: subreddits[0] });
        this.updateSubreddits(subreddits);
      } else {
        this.setState({ selected: ' ' });
        this.updateSubreddits(subreddits);
      }
    }

    if (index > -1) {
      subreddits.splice(index, 1);
      update();
    } else {
      update();
    }



  }

  updateNextSubreddit(event) {
    this.setState({nextSubreddit: event.target.value});
  }

  updateSelectedSubreddit(event) {
    this.setState({selected: event.target.value});
  }

  updateSubreddits(nextSubreddits) {
    this.setState({ subreddits: nextSubreddits });
    this.props.updateSubreddits(nextSubreddits);    
  }

  render() {
    return(
      <div className="container navigation">
        <div>Combine <strong>Subreddits</strong> or simply view <strong>Frontpage</strong></div>
        <div className="inline-elements">
          Enter Subreddit: 
          <input type='text' onChange={this.updateNextSubreddit} value={this.state.nextSubreddit} />
          <button onClick={this.addSubreddit}>Add</button>
          <h4>{this.state.message}</h4>
        </div>
        <div>
          To <strong>Remove</strong> a subreddit:
          <select onChange={this.updateSelectedSubreddit} value={this.state.selected}>
            {this.state.subreddits.map((subreddit, i) => 
              <option value={subreddit} key={i}>{subreddit}</option>
            )}
          </select>
          <button onClick={this.deleteSubreddit}>Remove</button>
        </div>
        <NavBarSort sortType={this.props.sortType} updateSortType={this.props.updateSortType} />
      </div>
    );
  }
}

export default NavBar;
