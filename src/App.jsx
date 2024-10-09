import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { store } from "./components/store.js";
import Protected from "./components/Protected.jsx";
import GetData from "./components/GetData.jsx";
import Slidenav from "./components/sidenav.jsx";
import Profile from "./components/Profile.jsx";
function App() {
  return (
    <>
      <Provider store={store}>
        <GetData>
          <Slidenav />
          {/* <Profile /> */}
          {/* <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/register" replace />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/chat"
                element={<Protected Component={ChatPage} />}
              />
            </Routes>
          </Router> */}
        </GetData>
      </Provider>
      {/* <Chat /> */}
      {/* <Setting /> */}
    </>
  );
}

export default App;
