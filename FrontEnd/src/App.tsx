import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
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
} from './pages/customer';
import { UtilitiesList } from './pages/utility-setup';
import { UnitList } from './pages/unit';

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
        <Route path="/utilities" element={<UtilitiesList />} />
        <Route path="/utilities/units" element={<UnitList />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
