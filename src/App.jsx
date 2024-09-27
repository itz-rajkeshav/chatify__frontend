import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Chat from "./components/chat";
import Setting from "./components/Setting";

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router> */}
      {/* <Chat /> */}
      <Setting />
    </>
  );
}

export default App;
