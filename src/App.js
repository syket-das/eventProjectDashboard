import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Contacts from './scenes/contacts';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Geography from './scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useUserStore } from './store/userStore';
import Agencies from './scenes/agencies';
import AgencyDetails from './scenes/agencies/AgencyDetails';
import Services from './scenes/services';
import ServiceDetails from './scenes/services/ServiceDetails';
import Categories from './scenes/categories';
import ServiceRequest from './scenes/serviceRequest';
import ServiceRequestDetails from './scenes/serviceRequest/ServiceRequestDetails';

function App() {
  const token = localStorage.getItem('token');
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser();
    }
  }, [isAuthenticated, token]);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agencies"
                element={
                  <ProtectedRoute>
                    <Agencies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agencies/:agencyId"
                element={
                  <ProtectedRoute>
                    <AgencyDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/services/:serviceId"
                element={
                  <ProtectedRoute>
                    <ServiceDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/team"
                element={
                  <ProtectedRoute>
                    <Team />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <ProtectedRoute>
                    <Contacts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service-request"
                element={
                  <ProtectedRoute>
                    <ServiceRequest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service-request/:serviceRequestId"
                element={
                  <ProtectedRoute>
                    <ServiceRequestDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
