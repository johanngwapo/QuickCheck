// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminPage from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";

const clientId = "1086377487635-p5pnpc11gkshsr8rjh87eqgrpg18tn8j.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
