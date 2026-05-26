import React from "react";

const DashboardCard = ({ title, count, Icon, note }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div className="dashboard-card-icon-wrap">
          {Icon ? <Icon size={20} strokeWidth={1.8} /> : null}
        </div>
        <span className="dashboard-card-label">{title}</span>
      </div>

      <p className="dashboard-card-value">{count ?? 0}</p>

      {note && <p className="dashboard-card-note">{note}</p>}
    </div>
  );
};

export default DashboardCard;