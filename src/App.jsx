import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ServiceAreas from './pages/ServiceAreas';
import AreaDetail from './pages/AreaDetail';
import About from './pages/About';
import Reviews from './pages/Reviews';
import OurWork from './pages/OurWork';
import FreeEstimate from './pages/FreeEstimate';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/service-areas/:slug" element={<AreaDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/free-estimate" element={<FreeEstimate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
