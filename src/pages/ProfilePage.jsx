import React from "react";
import ProfileDashboard from "./Auth/Profile";
import Layout from "../Layout/Layout";

const ProfilePage = () => {
  return (
    <div>
      <Layout>
        <ProfileDashboard />
      </Layout>
    </div>
  );
};

export default ProfilePage;
