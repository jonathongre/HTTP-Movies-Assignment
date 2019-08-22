import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='saved-header'>
      <div className='saved-container'> 
      <h3>Saved Movies:</h3>
      <div className="home-button">
          <Link to="/">Home</Link>
        </div>
        </div> 
      <div className="saved-list">
        
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
      </div>
      
      </div>
    );
  }
}
