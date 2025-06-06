import * as React from "react";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";

// Simple component to handle tempo routes without causing recursion
function TempoRoutesHandler() {
  // Only render tempo routes if in tempo environment
  if (!import.meta.env.VITE_TEMPO || import.meta.env.VITE_TEMPO !== "true") {
    return null;
  }

  // Return a simple route that will be handled by the main Routes component
  return null;
}
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MembershipRegistration from "./pages/MembershipRegistration";
import Donation from "./pages/Donation";
import DonationSuccess from "./pages/DonationSuccess";
import DonationDemo from "./pages/DonationDemo";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Sermons from "./pages/Sermons";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminGallery from "./pages/admin/Gallery";
import AdminSettings from "./pages/admin/Settings";
import AdminSermons from "./pages/admin/Sermons";
import AdminMembers from "./pages/admin/Members";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminPrayerRequests from "./pages/admin/PrayerRequests";
import AdminDonations from "./pages/admin/Donations";
import AdminUsers from "./pages/admin/Users";
import AdminHealthCheck from "./pages/admin/HealthCheck";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DataProvider } from "./contexts/DataContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "@/utils/debugSync"; // Initialize debug utilities

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <DataProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/membership"
                  element={<MembershipRegistration />}
                />
                <Route path="/donation" element={<Donation />} />
                <Route path="/donation-success" element={<DonationSuccess />} />
                <Route path="/donation-demo" element={<DonationDemo />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/services" element={<Services />} />
                <Route path="/sermons" element={<Sermons />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="login" element={<AdminLogin />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="sermons" element={<AdminSermons />} />
                  <Route path="members" element={<AdminMembers />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route
                    path="prayer-requests"
                    element={<AdminPrayerRequests />}
                  />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="health" element={<AdminHealthCheck />} />
                </Route>

                {/* Add this before the catchall route */}
                {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}
