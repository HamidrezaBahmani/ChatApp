import Register from "./pages/Register";
import Login from "./pages/Login";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login/" />;
    }
    return children;
  };
  const ProtectedRoute1 = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute1>
                <Login />
              </ProtectedRoute1>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute1>
                <Register />
              </ProtectedRoute1>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
