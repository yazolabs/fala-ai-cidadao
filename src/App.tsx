import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import NewTicket from "./pages/NewTicket";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { TicketsQueue } from "./pages/admin/TicketsQueue";
import { Reports } from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import Campaigns from "./pages/admin/Campaigns";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/" replace /> : <Login />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AppShell>
            <Home />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/map" element={
        <ProtectedRoute>
          <AppShell>
            <MapView />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/new" element={
        <ProtectedRoute allowedRoles={['Citizen']}>
          <AppShell>
            <NewTicket />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/notifications" element={
        <ProtectedRoute>
          <AppShell>
            <Notifications />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <AppShell>
            <Profile />
          </AppShell>
        </ProtectedRoute>
      } />
      
      {/* Backoffice Routes */}
      <Route path="/admin/queue" element={
        <ProtectedRoute allowedRoles={['Admin', 'Agent']}>
          <AppShell>
            <TicketsQueue />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['Admin', 'Agent']}>
          <AppShell>
            <Reports />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['Admin', 'Agent']}>
          <AppShell>
            <Settings />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AppShell>
            <Users />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/campaigns" element={
        <ProtectedRoute allowedRoles={['Admin', 'Agent']}>
          <AppShell>
            <Campaigns />
          </AppShell>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['Admin', 'Agent']}>
          <AppShell>
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold text-brand-blue mb-2">Backoffice</h1>
              <p className="text-muted-foreground">Em desenvolvimento</p>
            </div>
          </AppShell>
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
