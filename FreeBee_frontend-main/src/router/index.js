import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Donorform from "../pages/Donorform";
import Orphanage from "../pages/Orphanage";
import Orphanprofile from "../pages/Orphanprofile";
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Home />} exact={true} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/donorform" element={<Donorform />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orphanage" element={<Orphanage />} />
      <Route path="/orphanage_list" element={<Orphanprofile />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
