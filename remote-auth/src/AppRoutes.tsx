import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./core/components/Loader";
import { NotFound } from "remoteComponents/pages";

// Auth
const ForgotPassword = React.lazy(() => import("./auth/pages/ForgotPassword"));
const ForgotPasswordSubmit = React.lazy(
  () => import("./auth/pages/ForgotPasswordSubmit")
);
const Login = React.lazy(() => import("./auth/pages/Login"));
const Register = React.lazy(() => import("./auth/pages/Register"));

// Users

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password-submit"
            element={<ForgotPasswordSubmit />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
