import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { setName, setEmail, setuserName } from "./UserSlice.js";
import { useDispatch } from "react-redux";

const GetData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      console.log("no access token found");
      return;
    }

    console.log("access token from the userdata side", accessToken);

    try {
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
      // Dispatch actions to Redux store
      dispatch(setEmail(decodedToken.gmail));
      dispatch(setName(decodedToken.Name));
      dispatch(setuserName(decodedToken.userName));
    } catch (error) {
      console.log("Failed to decode token:", error);
    }
  }, [dispatch]);

  return null;
};

export default GetData;
