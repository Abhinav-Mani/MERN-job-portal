import React from 'react';

const Jumbo = props => {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{props.heading}</h1>
        <p className="lead text-muted">{props.lead}</p>
      </div>
    </section>
  );
};

export default Jumbo;
