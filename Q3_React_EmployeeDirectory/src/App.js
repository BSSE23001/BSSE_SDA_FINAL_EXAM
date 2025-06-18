import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EmployeePage from './pages/Employee';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
};

export default App;
