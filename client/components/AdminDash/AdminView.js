import React from "react";
import { useSelector } from "react-redux";
import VerticalTabs from "./VerticalTabs";
import DashboardBar from "./DashboardBar";

const AdminView = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {user.isAdmin ? (
        <div>
          <DashboardBar />
          <VerticalTabs />
        </div>
      ) : (
        <div>
          <h2>Access denied</h2>
        </div>
      )}
    </div>
  );
};

export default AdminView;
