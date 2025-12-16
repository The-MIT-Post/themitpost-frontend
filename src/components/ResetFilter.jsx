import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetFilter.css";

const ResetFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hasFilters = location.search.length > 0;

  if (!hasFilters) return null;

  const handleReset = () => {
    navigate("/");
  };

  return (
    <div className="reset-filter-container">
      <button className="reset-filter-btn" onClick={handleReset}>
        Reset Filter
      </button>
    </div>
  );
};

export default ResetFilter;
