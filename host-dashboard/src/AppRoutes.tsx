import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loader from './core/components/Loader';

// Remote components
import { Forbidden, NotFound, UnderConstructions } from 'remoteComponents/pages';

// Remote auth
import { ForgotPassword, ForgotPasswordSubmit, Login, Register } from 'remoteAuth/pages';

// Landing
const Landing = React.lazy(() => import('./landing/pages/Landing'));

// Admin
import Admin from 'admin/pages/Admin';
import Home from 'admin/pages/Home';
import Dashboard from 'admin/pages/Dashboard';
import VueDashboard from 'vue/pages/Dashboard';

const Faq = React.lazy(() => import('./admin/pages/Faq'));
const HelpCenter = React.lazy(() => import('./admin/pages/HelpCenter'));
const Profile = React.lazy(() => import('./admin/pages/Profile'));
const ProfileActivity = React.lazy(() => import('./admin/pages/ProfileActivity'));
const ProfileInformation = React.lazy(() => import('./admin/pages/ProfileInformation'));
const ProfilePassword = React.lazy(() => import('./admin/pages/ProfilePassword'));

// Users
const UserManagement = React.lazy(() => import('./users/pages/UserManagement'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="faq"
            element={
              <Suspense fallback={<Loader />}>
                <Faq />
              </Suspense>
            }
          />
          <Route
            path="help"
            element={
              <Suspense fallback={<Loader />}>
                <HelpCenter />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileActivity />
                </Suspense>
              }
            />
            <Route
              path="information"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileInformation />
                </Suspense>
              }
            />
            <Route
              path="password"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfilePassword />
                </Suspense>
              }
            />
          </Route>
          <Route path="projects" element={<Navigate to="/under-construction" replace />} />
          <Route
            path="user-management"
            element={
              <Suspense fallback={<Loader />}>
                <UserManagement />
              </Suspense>
            }
          />
          <Route path="vue" element={<VueDashboard />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-submit" element={<ForgotPasswordSubmit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/under-construction" element={<UnderConstructions />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
