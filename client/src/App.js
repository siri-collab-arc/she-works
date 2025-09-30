// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BackButton from "./components/common/BackButton";
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthRedirect from './components/auth/AuthRedirect';

import ProviderNavBar from './components/provider/ProviderNavBar';
import ProviderDashboard from './components/provider/ProviderDashboard';
import ProviderSettings from './components/provider/ProviderSettings';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import ClientProfilePage from "./components/client/ClientProfilePage";
import ClientProfileEditPage from './components/client/ClientProfileEditPage';

// Client Pages
import ClientDashboard from './components/client/ClientDashboard';
import CategoryPage from './components/client/CategoryPage';
import ServiceList from './components/client/ServiceList';
import ProviderProfileC from './components/client/ProviderProfileC';
import BookingPage from './components/client/BookingPage';
import ChatPage from './components/client/ChatPage';
import PaymentPage from './components/client/PaymentPage';
import WriteReviewPage from './components/client/WriteReviewPage';



// Provider Pages
import CreateProfile from './components/provider/CreateProfile';
import ProviderProfileView from './components/provider/ProviderProfileView';
import EditProviderProfile from './components/provider/EditProviderProfile';
import ManageBookings from './components/provider/ManageBookings';
import ProviderChat from './components/provider/ProviderChat';


// Shared
import NotFound from './components/shared/NotFound';



function App() {
  return (
    <Router>
      <BackButton />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={
          <AuthRedirect>
            <Login key={Date.now()} />
          </AuthRedirect>
        } />
        <Route path="/login" element={
          <AuthRedirect>
            <Login key={Date.now()} />
          </AuthRedirect>
        } />
        <Route path="/register" element={<Register />} />

        {/* Client Routes */}
        <Route path="/client/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
        <Route path="/services/:category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/services/:category/:subService" element={<ProtectedRoute><ServiceList /></ProtectedRoute>} />
        <Route path="/provider/:providerId" element={<ProtectedRoute><ProviderProfileC /></ProtectedRoute>} />
        <Route path="/client/book/:providerId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/client/chat/:providerId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/client/payment/:providerId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/client/writereview/:providerId" element={<ProtectedRoute><WriteReviewPage /></ProtectedRoute>} />
        <Route path="/client/profile" element={<ProtectedRoute><ClientProfilePage /></ProtectedRoute>} />
        <Route path="/client/edit-profile" element={<ProtectedRoute><ClientProfileEditPage /></ProtectedRoute>} />
        


        {/* Provider Routes */}
        <Route path="/provider/dashboard" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <ProviderDashboard />
            </>
          </ProtectedRoute>
        }/>
        <Route path="/provider/CreateProfile" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <CreateProfile/>
            </>
          </ProtectedRoute>
        }/>
        <Route path="/provider/ProviderProfileView" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <ProviderProfileView/>
            </>
          </ProtectedRoute>
        }/>
        <Route path="/edit-profile/:id" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <EditProviderProfile />
            </>
          </ProtectedRoute>
        }/>
        <Route path="/provider/ManageBookings" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <ManageBookings />
            </>
          </ProtectedRoute>
        }/>
        <Route path="/provider/ProviderChat/:bookingId" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <ProviderChat />
            </>
          </ProtectedRoute>
        }/>
        <Route path="/provider/settings" element={
          <ProtectedRoute>
            <>
              <ProviderNavBar />
              <ProviderSettings />
            </>
          </ProtectedRoute>
        }/>
       
        {/* Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
