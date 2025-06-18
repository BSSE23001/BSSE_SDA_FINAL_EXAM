import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductsPage from './pages/Products';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
