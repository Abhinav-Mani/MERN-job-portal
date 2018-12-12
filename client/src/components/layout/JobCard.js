import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ title, description, id, location }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link to={`/posao/${id}`}>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Detaljnije
                </button>
              </Link>
            </div>
            <small className="text-muted">
              <i className="fa fa-map-marker" /> Lokacija: {location}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
