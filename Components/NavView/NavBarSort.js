import React, {Component} from 'react';

// choose and filter subreddits
class NavBarSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.sortType
    };

    this.props = props;
    this.sortTypes = ['hot', 'top', 'new', 'rising', 'controversial', 'random'];
    this.updateSelectedSortType = this.updateSelectedSortType.bind(this);
  }

  updateSelectedSortType(event) {
    this.setState({ selected: event.target.value });
    this.updateSortType(event.target.value);
  }

  updateSortType(nextSortType) {
    this.props.updateSortType(nextSortType);
  }

  render() {
    return(
        <div className='inline-elements'>
          <strong>Browse</strong> by:
          <select onChange={this.updateSelectedSortType} value={this.state.selected}>
            {this.sortTypes.map((sortType, i) => 
              <option value={sortType} key={i}>{sortType}</option>
            )}
          </select>
        </div>
    );
  }
}

export default NavBarSort;
