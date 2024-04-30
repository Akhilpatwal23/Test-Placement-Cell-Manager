import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromUrl = urlParam.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/**Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/** Profile */}
      {tab === "profile" && <DashProfile />}
      {/** Posts */}
      {tab === "posts" && <DashPosts />}
      {/** Users */}
      {tab === "users" && <DashUsers />}
    </div>
  );
};
export default Dashboard;
