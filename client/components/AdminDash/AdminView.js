import React from "react";
import VerticalTabs from "./VerticalTabs";
import DashboardBar from "./DashboardBar";

const AdminView = () => {
  return (
    <div>
      <DashboardBar />
      <VerticalTabs />;
    </div>
  );
};

export default AdminView;
