import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout.jsx';
import {
  Dashboard,
  ConnectionDetail,
  ConnectionsList,
  AddConnectionWizard,
  ReadingsList,
  UtilitiesSetup,
} from './pages';

import {
  CustomerList,
  CustomerDetails,
} from './pages/customer/index.ts';

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Customers */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId" element={<CustomerDetails />} />
        <Route
          path="/customers/:customerId/connections/new"
          element={<AddConnectionWizard />}
        />

        {/* Connections */}
        <Route path="/connections" element={<ConnectionsList />} />
        <Route path="/connections/:connectionId" element={<ConnectionDetail />} />
        <Route
          path="/connections/:connectionId/readings/new"
          element={<ConnectionDetail />}
        />

        {/* Readings */}
        <Route path="/readings" element={<ReadingsList />} />

        {/* Setup */}
        <Route path="/setup" element={<Navigate to="/setup/utilities" replace />} />
        <Route path="/setup/utilities" element={<UtilitiesSetup />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
