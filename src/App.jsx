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
import GetData from "./components/GetData.jsx";
import Setting from "./components/Setting.jsx";
import Profile from "./components/Profile.jsx";
import UserChatUi from "./components/UserChatUi";
import ShowChat from "./components/showChat";
// import InitialChatUi from "./components/InitialChatUi";
function App() {
  const isAuthenticated = true;
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<GetData />}>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/chat/convoId/:convoId" element={<ShowChat />} />
            </Route>
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
        {/* <UserChatUi /> */}
      </Provider>
    </>
  );
}

export default App;
