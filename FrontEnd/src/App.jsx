import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import {
  Dashboard,
  CustomersList,
  CustomerDetail,
  AddConnectionWizard,
  ConnectionsList,
  ConnectionDetail,
  ReadingsList,
  UtilitiesSetup,
} from './pages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Customers */}
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/customers/:customerId" element={<CustomerDetail />} />
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
