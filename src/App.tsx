import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterDonationPage from './pages/RegisterDonationPage';
import DonationListPage from './pages/DonationListPage';
import AdminPortalPage from './pages/AdminPortalPage';
import RegisterDisasterPage from './pages/RegisterDisasterPage';
import PendingDonationsPage from './pages/PendingDonationsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-16 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-donation" element={<RegisterDonationPage />} />
            <Route path="/donation-list" element={<DonationListPage />} />
            <Route path="/admin" element={<AdminPortalPage />} />
            <Route path="/register-disaster" element={<RegisterDisasterPage />} />
            <Route path="/pending-donations" element={<PendingDonationsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;