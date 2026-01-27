import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  const { authUser, isLoading } = useAuthUser();
  const isAuthenticated = Boolean(authUser);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-lime-500"></span>
          <p className="text-base-content/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route
          path="/transactions"
          element={isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
