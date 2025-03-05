import React from "react";
import { Routes, Route} from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Explore from "../Pages/Explore";
import Header from "../Components/Header";
import Leagues from "../Pages/Leagues";
import Community from "../Pages/Community";

const AppRoutes = (props) => {
  return (
      <Routes>
        <Route index element={<Landing {...props} />} />
        <Route path="login" element={<Login {...props} />} />
        <Route path="dashboard" element={<Dashboard {...props} />} />
        <Route path="explore" element={<Explore {...props} />} />
        <Route path="leagues" element={<Leagues {...props} />} />
        <Route path="community" element={<Community {...props} />} />
      </Routes>
  );
};

export default AppRoutes;
