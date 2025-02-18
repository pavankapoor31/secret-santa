import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { Results } from './pages/Results';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="upload" element={<Upload />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;