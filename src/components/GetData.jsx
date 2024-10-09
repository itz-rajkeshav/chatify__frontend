import { useEffect, useState } from "react";
import { setName, setEmail, setuserName, setprofilePic } from "./UserSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";

const GetData = ({ children }) => {
  const dispatch = useDispatch();
  const [showLoading, setshowLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken);
    if (!accessToken) {
      console.log("no access token found");
      return;
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
        setshowLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getprofileData();
  }, [dispatch]);
  return showLoading ? (
    <p className="text-3xl">Loading......................................</p>
  ) : (
    children
  );
};
export default GetData;
