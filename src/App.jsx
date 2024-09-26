import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
