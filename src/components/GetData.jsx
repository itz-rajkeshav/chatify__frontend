import { useEffect, useState } from "react";
import {
  setName,
  setEmail,
  setuserName,
  setprofilePic,
  setId,
} from "./UserSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import Slidenav from "./sidenav.jsx";
import { Progress } from "@/components/ui/progress";

const GetData = () => {
  const dispatch = useDispatch();
  const [showLoading, setshowLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  useEffect(() => {
    if (!accessToken) {
      console.log("no access token found");
    }
    // console.log("access token from the userdata side", accessToken);

    const getprofileData = async () => {
      try {
        setshowLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/profile/get",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        // console.log(response.data);
        dispatch(setprofilePic(response.data.data.avatar));
        dispatch(setEmail(response.data.data.gmail));
        dispatch(setName(response.data.data.Name));
        dispatch(setuserName(response.data.data.userName));
        dispatch(setId(response.data.data._id));
        setshowLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getprofileData();
  }, [dispatch]);
  return showLoading ? (
    // <p className="text-3xl">Loading......................................</p>
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="font-serif text-2xl mb-7 ">Chatify</div>
      <div className="w-96 h-20">
        <Progress value={79} />
      </div>
    </div>
  ) : (
    <div className="flex">
      <Slidenav />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
export default GetData;
