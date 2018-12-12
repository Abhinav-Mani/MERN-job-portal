import React, { Component } from 'react';

class JobWrapper extends Component {
  render() {
    return (
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default JobWrapper;
