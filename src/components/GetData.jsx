import { useEffect, useState } from "react";
import {
  setName,
  setEmail,
  setuserName,
  setprofilePic,
  setcoverImage,
  setId,
} from "./UserSlice.js";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Slidenav from "./sidenav.jsx";
import { Progress } from "@/components/ui/progress";
import axiosInstance from "@/lib/axios.js";
import ErrorPage from "./ErrorPage.jsx";

const GetData = () => {
  const [isLoadData, setisLoadData] = useState(false);
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setProgress(30);
        const response = await axiosInstance.get("/profile/get");
        setProgress(60);
        console.log(response.data);

        dispatch(setcoverImage(response.data.data.coverImage));
        dispatch(setprofilePic(response.data.data.avatar));
        dispatch(setEmail(response.data.data.gmail));
        dispatch(setName(response.data.data.Name));
        dispatch(setuserName(response.data.data.userName));
        dispatch(setId(response.data.data._id));

        setProgress(100);
        setShowLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setisLoadData(true);
        setShowLoading(false);
      }
    };

    getProfileData();
  }, [dispatch]);

  if (showLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="font-serif text-2xl mb-7">Chatify</div>
        <Progress value={progress} />
        <div className="w-96 h-20"></div>
      </div>
    );
  }
  return isLoadData ? (
    <ErrorPage />
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
